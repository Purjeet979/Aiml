---
license: mit
tags:
- computer-vision
- image-classification
- resnet
- sports
- tennis
datasets:
- custom
---

# Tennis Play vs Non-Play Classifier

## Model Description
This is a fine-tuned **ResNet-18** model designed to classify frames from tennis broadcast videos into two categories:
- **Play**: Frames where a tennis rally is actively taking place.
- **Non-Play**: Frames containing crowd shots, player close-ups, commercials, or breaks.

This model was trained to help automate the creation of tennis match highlights by filtering out all non-action sequences.

## Intended Use
- **Action Filtering:** Automatically filter long tennis match videos to keep only active play segments.
- **Highlight Generation:** Pre-processing step for automated sports highlight pipelines.

## Training Data
The model was trained on a custom dataset extracted from grand slam matches (Wimbledon, US Open, Roland Garros). Frames were extracted and manually sorted into `Play` and `Non-Play` directories to create a robust ground-truth dataset.

## Performance
- **Base Model:** ResNet-18 (pre-trained on ImageNet)
- **Accuracy:** ~94% on validation set
- **Inference Speed:** ~35 FPS on standard GPU

## How to Use (PyTorch)
```python
import torch
import torchvision.models as models
import torch.nn as nn

# 1. Load the ResNet-18 architecture
model = models.resnet18()
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2) # 2 classes: Play and Non-Play

# 2. Load the trained weights
state_dict = torch.load('play_vs_nonplay.pth', map_location='cpu')
model.load_state_dict(state_dict)
model.eval()

# 3. Model is now ready for inference!
```
