<div align="center">
  <img src="Neon Tennis Play Emblem.png" alt="PlayPulse AI Emblem" width="160" />

  # 🎾 PLAYPULSE AI — Smart Tennis Match Highlight Generator & Rally Filter
</div>

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An end-to-end Deep Learning and Computer Vision pipeline designed to automatically analyze full-length broadcast tennis matches, separating active rally frames (**Play**) from downtime (**Non-Play**—crowd shots, player close-ups, breaks, and commercial intervals). 

PLAYPULSE AI stitches high-action frames into an uninterrupted, broadcast-grade highlight reel, significantly reducing match review time.

---

## ⚡ Key Highlights

- **Deep Learning Frame Classification:** Fine-tuned **ResNet-18** model delivering ~94% validation accuracy on Grand Slam footage (Wimbledon, US Open, Roland Garros).
- **Asynchronous Task Architecture:** Built on FastAPI with asynchronous background workers to process high-resolution video streams without blocking API requests.
- **Modern Glassmorphic Web App:** High-aesthetic React + Vite + Tailwind CSS interface featuring cinematic previews, live processing metrics, and instant clip downloads.
- **Standalone Gradio Interface:** An alternative single-script UI (`app.py`) for quick inference and testing.
- **Modular Pipeline:** Extensible design supporting custom confidence thresholds, video resolution normalization, and multi-threaded video decoding via OpenCV.

---

## 🏗️ System Architecture

```
[ Broadcast Video (.mp4) ]
             │
             ▼
   [ Fast API Endpoints ]  ── (Async Job Queue & UUID Generation)
             │
             ▼
    [ Video Decoding ]      ── (OpenCV Frame Extraction & BGR -> RGB)
             │
             ▼
  [ Tensor Preprocessing ]  ── (Resize 224x224, PyTorch ImageNet Normalization)
             │
             ▼
  [ ResNet-18 Classifier ]  ── (Softmax Probabilities: Play vs Non-Play)
             │
             ├──────────────────────────┐
             ▼                          ▼
     [ "Play" Frames ]          [ "Non-Play" Frames ]
             │                          │
             ▼                          ▼
[ Video Writer (mp4v/H264) ]   [ Video Writer (Diagnostics) ]
             │
             ▼
[ Filtered Highlight Output (.mp4) ] ──▶ [ React Web Frontend Preview ]
```

---

## 📂 Project Structure

```text
AIML/
├── backend/
│   ├── app.py                   # Standalone Gradio web application
│   ├── main.py                  # Production FastAPI REST backend
│   ├── play_vs_nonplay.pth      # Fine-tuned ResNet-18 PyTorch model weights
│   ├── requirements.txt         # Python dependencies
│   ├── video_play_filter.py     # Core computer vision & PyTorch inference pipeline
│   ├── input/                   # Staging directory for uploaded videos
│   ├── output/                  # Generated filtered highlights
│   └── temp/                    # Temporary video processing buffer
├── frontend/
│   ├── src/                     # React + TypeScript source code
│   │   ├── components/          # UI components (Upload, Hero, Processing, Results)
│   │   ├── App.tsx              # Main application container
│   │   └── main.tsx             # Frontend entry point
│   ├── package.json             # Node dependencies and build scripts
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── vite.config.ts           # Vite build configuration
├── notebooks/
│   ├── Colab_Training_Notebook.ipynb       # GPU-accelerated model training in Google Colab
│   ├── Dataset_Creation_Notebook.ipynb    # Video frame extraction and labeling pipeline
│   ├── Master_Tennis_Project.ipynb        # Unified end-to-end experimental workflow
│   └── Model_Selection_EDA_Notebook.ipynb # Exploratory analysis & baseline comparisons
├── docs/
│   ├── hf_model_card.md         # Hugging Face model documentation card
│   └── tennis_project_explanation.md # Technical project report and breakdown
├── .gitignore                   # Multi-stage git ignore configuration
├── .gitattributes               # Line ending normalization
└── README.md                    # Project documentation
```

---

## 🛠️ Tech Stack

| Tier | Technologies Used |
|---|---|
| **Deep Learning** | PyTorch, Torchvision, Transfer Learning (ResNet-18) |
| **Computer Vision** | OpenCV (`cv2`), Pillow (`PIL`), Image Transforms |
| **Backend API** | FastAPI, Uvicorn, Python Multipart, Tqdm |
| **Frontend UI** | React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite |
| **Prototyping** | Gradio, Google Colab (Tesla T4 GPU) |

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10 or higher**
- **Node.js 18+ & npm**
- **CUDA-compatible GPU** (Recommended for accelerated inference, falls back to CPU automatically)

---

### 1. Backend Setup

1. Open your terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Launch the FastAPI server:
   ```bash
   python main.py
   ```
   *The API will be live at `http://127.0.0.1:8000` (Interactive docs available at `http://127.0.0.1:8000/docs`).*

*(Optional)* Run the Gradio demo interface instead:
```bash
python app.py
```

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the required Node packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📊 Model Details & Metrics

- **Base Architecture:** ResNet-18 (Pretrained on ImageNet-1k)
- **Classification Head:** Linear classifier modified for 2 output classes (`0: Non-Play`, `1: Play`)
- **Loss Function:** Cross-Entropy Loss
- **Optimizer:** Adam with learning rate `1e-4`
- **Validation Accuracy:** **94.2%**
- **Inference Speed:** ~35 FPS on an NVIDIA RTX GPU (~1.1x realtime for 30 FPS video)

---

## 🌐 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/process` | Uploads match video and initiates asynchronous ML filtering job |
| `GET` | `/api/status/{job_id}` | Returns current job status (`processing`, `completed`, `failed`) and statistics |
| `GET` | `/api/download/{job_id}` | Serves the processed highlight video file |

---

## 👤 Author & Contributions

Created and maintained by **[Purjeet](https://github.com/Purjeet979)**.

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/Purjeet979/Aiml/issues).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
