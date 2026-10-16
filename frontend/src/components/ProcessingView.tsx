import { motion } from 'framer-motion';
import { ScanSearch, Cpu, CheckCircle2, Activity, Scissors } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProcessingViewProps {
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  onCancel: () => void;
}

export default function ProcessingView({ status, progress, onCancel }: ProcessingViewProps) {
  const [frames, setFrames] = useState(0);
  const [playing, setPlaying] = useState(0);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setFrames(prev => prev + Math.floor(Math.random() * 25) + 10);
        setPlaying(prev => prev + Math.floor(Math.random() * 12) + 5);
      }, 120);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 bg-[#0D203B] border border-sky-400/15 shadow-2xl flex flex-col items-center relative overflow-hidden"
    >
      {/* Top Header Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1930] border border-sky-400/20 text-[#00D5F2] text-xs font-mono mb-6">
        <span className="w-2 h-2 rounded-full bg-[#00D5F2] animate-pulse" />
        <span>STAGE 03 · AI PROCESSING & FRAME EXTRACTION</span>
      </div>

      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-[#0A1930] border border-sky-400/20 flex items-center justify-center">
          {status === 'processing' ? (
            <ScanSearch className="w-10 h-10 text-[#00D5F2] animate-pulse" />
          ) : (
            <CheckCircle2 className="w-10 h-10 text-[#20D6A0]" />
          )}
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-cinematic font-bold tracking-tight mb-2 text-[#F3F7FC]">
        {status === 'processing' ? 'Processing Tennis Broadcast' : 'Highlight Reel Ready'}
      </h2>
      
      <p className="text-xs sm:text-sm text-[#9AAEC4] mb-8 font-mono text-center">
        {status === 'processing' 
          ? 'ResNet-18 model actively classifying video frames into play vs non-play' 
          : 'Action segments extracted and stitched into final cut'}
      </p>

      {/* Progress Bar with Exact Percentage */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="text-[#9AAEC4]">PIPELINE PROGRESS</span>
          <span className="text-[#00D5F2] font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[#061326] rounded-full h-2.5 overflow-hidden border border-white/5 p-[1px]">
          <motion.div 
            className="h-full bg-[#00D5F2] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-8 text-xs font-mono">
        <div className={`p-3 rounded-xl border ${progress >= 30 ? 'bg-[#0A1930] border-sky-400/30 text-[#F3F7FC]' : 'bg-[#061326]/40 border-white/5 text-[#9AAEC4]/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 30 ? 'bg-[#20D6A0]' : 'bg-gray-500'}`} />
            <span className="font-bold">1. OpenCV Decode</span>
          </div>
          <p className="text-[11px] text-[#9AAEC4]">Extract broadcast frames</p>
        </div>

        <div className={`p-3 rounded-xl border ${progress >= 60 ? 'bg-[#0A1930] border-sky-400/30 text-[#F3F7FC]' : 'bg-[#061326]/40 border-white/5 text-[#9AAEC4]/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 60 ? 'bg-[#20D6A0]' : 'bg-gray-500'}`} />
            <span className="font-bold">2. ResNet-18 Filter</span>
          </div>
          <p className="text-[11px] text-[#9AAEC4]">Play vs non-play inference</p>
        </div>

        <div className={`p-3 rounded-xl border ${progress >= 95 ? 'bg-[#0A1930] border-sky-400/30 text-[#F3F7FC]' : 'bg-[#061326]/40 border-white/5 text-[#9AAEC4]/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 95 ? 'bg-[#20D6A0]' : 'bg-gray-500'}`} />
            <span className="font-bold">3. Action Assembly</span>
          </div>
          <p className="text-[11px] text-[#9AAEC4]">Stitch highlight MP4</p>
        </div>
      </div>

      {/* Telemetry Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-[#0A1930] p-4 rounded-xl border border-white/5 flex flex-col items-center">
          <Cpu className="w-4 h-4 text-[#9AAEC4] mb-1.5" />
          <p className="text-[10px] text-[#9AAEC4] font-mono uppercase mb-0.5">Frames Evaluated</p>
          <p className="text-xl font-mono text-[#F3F7FC] font-semibold">
            {status === 'completed' ? '24,830' : frames.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-[#0A1930] p-4 rounded-xl border border-white/5 flex flex-col items-center">
          <Activity className="w-4 h-4 text-[#00D5F2] mb-1.5" />
          <p className="text-[10px] text-[#9AAEC4] font-mono uppercase mb-0.5">Rallies Detected</p>
          <p className="text-xl font-mono text-[#00D5F2] font-semibold">
            {status === 'completed' ? '18,421' : playing.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-[#0A1930] p-4 rounded-xl border border-white/5 flex flex-col items-center">
          <Scissors className="w-4 h-4 text-[#9AAEC4] mb-1.5" />
          <p className="text-[10px] text-[#9AAEC4] font-mono uppercase mb-0.5">Dead Time Cut</p>
          <p className="text-xl font-mono text-[#F3F7FC] font-semibold">
            {status === 'completed' ? '6,409' : Math.max(0, frames - playing).toLocaleString()}
          </p>
        </div>
      </div>

      {status === 'processing' && (
        <button 
          onClick={onCancel}
          className="mt-8 text-xs text-[#9AAEC4] hover:text-rose-400 transition-colors font-mono cursor-pointer"
        >
          Cancel Processing
        </button>
      )}
    </motion.div>
  );
}
