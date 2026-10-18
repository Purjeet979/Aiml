import { useState } from 'react';
import axios from 'axios';
import CinematicIntro from './components/CinematicIntro';
import LandingPage from './components/landing/LandingPage';
import UploadZone from './components/UploadZone';
import VideoPreview from './components/VideoPreview';
import ProcessingView from './components/ProcessingView';
import ResultsView, { type VideoStats } from './components/ResultsView';
import TennisAmbientBackground from './components/effects/TennisAmbientBackground';
import { LayoutDashboard } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

type AppState = 'intro' | 'landing' | 'upload' | 'preview' | 'processing' | 'results';

export default function App() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'processing' | 'completed' | 'failed'>('processing');
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<VideoStats | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setAppState('preview');
  };

  const startAnalysis = async () => {
    if (!file) return;
    setAppState('processing');
    setProcessingStatus('processing');
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/process`, formData);
      const newJobId = response.data.job_id;
      setJobId(newJobId);
      pollStatus(newJobId);
    } catch (error) {
      console.error("Failed to start analysis", error);
      alert("Failed to start analysis. Ensure backend is running.");
      setAppState('preview');
    }
  };

  const pollStatus = (currentJobId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_URL}/api/status/${currentJobId}`);
        const status = res.data.status;
        
        // Simulated progress increment for Phase 1
        setProgress(p => Math.min(p + 5, 95));

        if (status === 'completed') {
          clearInterval(interval);
          setProgress(100);
          setProcessingStatus('completed');
          if (res.data.stats) {
            setStats(res.data.stats);
          }
          setTimeout(() => setAppState('results'), 1200);
        } else if (status === 'failed') {
          clearInterval(interval);
          setProcessingStatus('failed');
          alert("Processing failed: " + res.data.error);
          setAppState('landing');
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 2000);
  };

  const handleReset = () => {
    setFile(null);
    setJobId(null);
    setStats(null);
    setAppState('landing');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-tennis-accent selection:text-black">
      {appState === 'intro' && (
        <CinematicIntro onComplete={() => setAppState('landing')} />
      )}

      {appState !== 'intro' && (
        <div className="relative min-h-screen flex flex-col">
          {/* Ambient ReactBits style Glowing Background */}
          <TennisAmbientBackground />

          {/* Compact Professional Sports-Tech Navbar */}
          <nav className="fixed top-0 w-full z-40 h-16 bg-[#061326]/90 backdrop-blur-md border-b border-sky-400/10 px-6 sm:px-8 flex justify-between items-center transition-all duration-200">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleReset}>
              <div className="w-8 h-8 rounded-lg bg-[#0A1930] border border-sky-400/20 flex items-center justify-center">
                <LayoutDashboard className="text-[#00D5F2] w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-cinematic font-bold tracking-wider text-base sm:text-lg text-[#F3F7FC] group-hover:text-[#00D5F2] transition-colors">
                  PLAYPULSE AI
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A1930] text-[#9AAEC4] border border-white/5 uppercase">
                  Tennis Broadcast Suite
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {appState === 'landing' && (
                <button
                  onClick={() => {
                    document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-mono text-[#9AAEC4] hover:text-[#00D5F2] px-3 py-1.5 transition-colors cursor-pointer"
                >
                  ABOUT US
                </button>
              )}

              {appState !== 'upload' && appState !== 'processing' && (
                <button 
                  onClick={() => setAppState('upload')}
                  className="text-xs font-mono font-bold tracking-wider text-[#061326] bg-[#00D5F2] hover:bg-[#38E1FA] px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  NEW MATCH
                </button>
              )}
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="relative z-10 flex-1 pt-24 pb-12 px-4 flex flex-col">
            {appState === 'landing' && <LandingPage onUploadClick={() => setAppState('upload')} />}
            
            {appState === 'upload' && <UploadZone onFileSelect={handleFileSelect} />}
            
            {appState === 'preview' && file && (
              <VideoPreview 
                file={file} 
                onAnalyze={startAnalysis} 
                onCancel={handleReset} 
              />
            )}
            
            {appState === 'processing' && (
              <ProcessingView status={processingStatus} progress={progress} onCancel={handleReset} />
            )}
            
            {appState === 'results' && jobId && (
              <ResultsView 
                videoUrl={`${API_URL}/api/download/${jobId}`} 
                stats={stats}
                onReset={handleReset} 
              />
            )}
          </main>

          {/* Clean Sports-Tech Footer */}
          <footer className="relative z-10 border-t border-sky-400/10 py-6 text-center text-[#9AAEC4] text-xs font-mono mt-auto bg-[#040E1E]">
            <p className="text-[#9AAEC4]">PlayPulse AI — Automated tennis broadcast rally extraction & dead-time elimination.</p>
            <p className="mt-1.5 text-[#9AAEC4]/60">PyTorch · ResNet-18 Deep Learning · OpenCV · FastAPI · React</p>
          </footer>
        </div>
      )}
    </div>
  );
}
