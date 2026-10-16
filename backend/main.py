import os
import shutil
from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
import uuid
from video_play_filter import process_video

app = FastAPI(title="PLAYFILTER AI")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory job store (replace with Redis/DB for production)
jobs = {}

def run_ml_pipeline(job_id: str, input_path: str):
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output", job_id)
    weights_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "play_vs_nonplay.pth")
    
    try:
        # process_video returns (playing_vid, non_playing_vid, stats)
        playing_vid, non_playing_vid, stats = process_video(input_path, output_dir, weights_path=weights_path)
        
        jobs[job_id]["status"] = "completed"
        jobs[job_id]["output_video"] = playing_vid
        jobs[job_id]["non_playing_video"] = non_playing_vid
        jobs[job_id]["stats"] = stats
    except Exception as e:
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["error"] = str(e)

@app.post("/api/process")
async def process_video_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "processing"}
    
    # Save uploaded file to temp directory
    temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "temp")
    os.makedirs(temp_dir, exist_ok=True)
    input_path = os.path.join(temp_dir, f"{job_id}_{file.filename}")
    
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Start ML pipeline in background to not block the API
    background_tasks.add_task(run_ml_pipeline, job_id, input_path)
    
    return JSONResponse(content={"job_id": job_id, "status": "processing"})

@app.get("/api/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        return JSONResponse(status_code=404, content={"error": "Job not found"})
    return JSONResponse(content=jobs[job_id])

@app.get("/api/download/{job_id}")
async def download_video(job_id: str):
    if job_id not in jobs or jobs[job_id]["status"] != "completed":
        return JSONResponse(status_code=404, content={"error": "Video not ready or job not found"})
    
    video_path = jobs[job_id]["output_video"]
    if not os.path.exists(video_path):
        return JSONResponse(status_code=404, content={"error": "Output video file missing"})
        
    return FileResponse(video_path, media_type="video/mp4", filename=f"action_cut_{job_id}.mp4")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
