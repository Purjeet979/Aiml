import cv2
import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
from tqdm import tqdm

def format_seconds(seconds: float) -> str:
    sec = max(0, int(seconds))
    h = sec // 3600
    m = (sec % 3600) // 60
    s = sec % 60
    return f"{h:02d}:{m:02d}:{s:02d}"

def load_model(weights_path, device, model_name="resnet18", num_classes=2):
    from torchvision import models
    model = getattr(models, model_name)(weights=None)
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, num_classes)
    state = torch.load(weights_path, map_location=device)
    model.load_state_dict(state)
    model.to(device)
    model.eval()
    return model

def predict_frame(model, device, frame, transform):
    img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    img_t = transform(img).unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = model(img_t)
        probs = torch.softmax(outputs, dim=1)
        conf, preds = torch.max(probs, 1)
    return preds.item(), float(conf.item())

def process_video(input_video_path, output_dir, weights_path="play_vs_nonplay.pth"):
    os.makedirs(output_dir, exist_ok=True)
    base_name = os.path.splitext(os.path.basename(input_video_path))[0]
    output_video_labeled = os.path.join(output_dir, f"{base_name}_labeled.mp4")
    output_video_playing_only = os.path.join(output_dir, f"{base_name}_playing_only.mp4")
    output_video_non_playing_only = os.path.join(output_dir, f"{base_name}_non_playing_only.mp4")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = load_model(weights_path, device, model_name="resnet18", num_classes=2)

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])

    cap = cv2.VideoCapture(input_video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    if not fps or fps <= 0 or fps > 240:
        fps = 30.0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    labeled_writer = cv2.VideoWriter(output_video_labeled, cv2.VideoWriter_fourcc(*"mp4v"), fps, (width, height))
    playing_writer = cv2.VideoWriter(output_video_playing_only, cv2.VideoWriter_fourcc(*"mp4v"), fps, (width, height))
    non_playing_writer = cv2.VideoWriter(output_video_non_playing_only, cv2.VideoWriter_fourcc(*"mp4v"), fps, (width, height))

    # Step 1: Classification
    labels = []
    confidences = []
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    for _ in tqdm(range(total_frames), desc="Step 1: Classifying frames", unit="frame"):
        ret, frame = cap.read()
        if not ret:
            break
        pred, conf = predict_frame(model, device, frame, transform)
        labels.append(pred)
        confidences.append(conf)

    actual_frames = len(labels) if len(labels) > 0 else total_frames

    # Step 2: Write labeled video
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    for idx in tqdm(range(actual_frames), desc="Step 2: Creating labeled video", unit="frame"):
        ret, frame = cap.read()
        if not ret:
            break
        label_text = "Playing" if labels[idx] == 1 else "Non-Playing"
        color = (0, 255, 0) if labels[idx] == 1 else (0, 0, 255)
        cv2.putText(frame, label_text, (20, 40), cv2.FONT_HERSHEY_DUPLEX, 1.2, color, 3)
        labeled_writer.write(frame)

    # Step 3: Write split videos
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    idx_counter = 0
    for _ in tqdm(range(actual_frames), desc="Step 3: Creating split videos", unit="frame"):
        ret, frame = cap.read()
        if not ret:
            break
        if labels[idx_counter] == 1:
            playing_writer.write(frame)
        else:
            non_playing_writer.write(frame)
        idx_counter += 1

    cap.release()
    labeled_writer.release()
    playing_writer.release()
    non_playing_writer.release()

    # Calculate real statistics and timeline segments
    orig_sec = actual_frames / fps if actual_frames > 0 else 0
    action_frames = sum(labels)
    action_sec = action_frames / fps if actual_frames > 0 else 0
    removed_sec = max(0.0, orig_sec - action_sec)
    avg_conf = (sum(confidences) / len(confidences)) if confidences else 0.95

    segments = []
    if labels:
        cur_label = labels[0]
        start_idx = 0
        for i, l in enumerate(labels):
            if l != cur_label:
                dur = (i - start_idx) / fps
                segments.append({
                    "type": "play" if cur_label == 1 else "non_play",
                    "start_sec": round(start_idx / fps, 2),
                    "end_sec": round(i / fps, 2),
                    "duration_sec": round(dur, 2),
                    "start_time": format_seconds(start_idx / fps),
                    "end_time": format_seconds(i / fps),
                    "percentage": round(((i - start_idx) / actual_frames) * 100, 2)
                })
                cur_label = l
                start_idx = i
        dur = (actual_frames - start_idx) / fps
        segments.append({
            "type": "play" if cur_label == 1 else "non_play",
            "start_sec": round(start_idx / fps, 2),
            "end_sec": round(actual_frames / fps, 2),
            "duration_sec": round(dur, 2),
            "start_time": format_seconds(start_idx / fps),
            "end_time": format_seconds(actual_frames / fps),
            "percentage": round(((actual_frames - start_idx) / actual_frames) * 100, 2)
        })

    stats = {
        "original_duration_formatted": format_seconds(orig_sec),
        "action_duration_formatted": format_seconds(action_sec),
        "removed_duration_formatted": format_seconds(removed_sec),
        "original_duration_seconds": round(orig_sec, 2),
        "action_duration_seconds": round(action_sec, 2),
        "removed_duration_seconds": round(removed_sec, 2),
        "confidence_score": round(avg_conf * 100, 1),
        "total_frames": actual_frames,
        "action_frames": action_frames,
        "fps": round(fps, 2),
        "segments": segments
    }

    print("Processing complete!")
    return output_video_playing_only, output_video_non_playing_only, stats

if __name__ == "__main__":
    process_video(r"input\input1.mp4", "output")
