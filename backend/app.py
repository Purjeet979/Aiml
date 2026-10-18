import gradio as gr
import os
from video_play_filter import process_video

# Custom CSS to create a premium animated background and glassmorphism effect
custom_css = """
body {
    background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #0f0c29);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    color: white !important;
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Glassmorphism styling for Gradio containers */
.gradio-container {
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    padding: 30px !important;
    margin-top: 50px !important;
}

h1, p {
    text-align: center;
    color: #ffffff !important;
    font-family: 'Inter', sans-serif;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.primary {
    background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%) !important;
    border: none !important;
    color: white !important;
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.4) !important;
    transition: all 0.3s ease !important;
}

.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 210, 255, 0.6) !important;
}
"""

def handle_video(video_path, progress=gr.Progress(track_tqdm=True)):
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(SCRIPT_DIR, "output_gradio")
    weights_path = os.path.join(SCRIPT_DIR, "play_vs_nonplay.pth")
    
    # We still process both, but only return the playing one to the UI
    playing_vid, *_ = process_video(video_path, output_dir, weights_path=weights_path)
    return playing_vid

with gr.Blocks(css=custom_css, title="PlayPulse AI") as app:
    gr.Markdown("# 🎾 PlayPulse AI")
    gr.Markdown("Upload a tennis video and our AI will extract only the playing segments for you.")
    
    with gr.Row():
        with gr.Column():
            video_in = gr.File(label="Upload Match Video", file_types=["video"])
            submit_btn = gr.Button("Extract Play", variant="primary")
        with gr.Column():
            video_out = gr.Video(label="Playing Frames Only")
            
    submit_btn.click(fn=handle_video, inputs=video_in, outputs=video_out)

if __name__ == "__main__":
    app.launch()
