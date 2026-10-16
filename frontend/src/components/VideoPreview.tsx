import { motion } from 'framer-motion';
import { Zap, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoPreviewProps {
  file: File;
  onAnalyze: () => void;
  onCancel: () => void;
}

export default function VideoPreview({ file, onAnalyze, onCancel }: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto flex flex-col gap-6"
    >
      {/* Top Breadcrumb / Stage Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-sky-400/10 text-xs font-mono">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-[#9AAEC4] hover:text-[#F3F7FC] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Ingestion</span>
        </button>
        <span className="text-[#00D5F2] font-semibold">STAGE 02 · VERIFY & LAUNCH INFERENCE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Source Video Player Column */}
        <div className="lg:col-span-2 rounded-2xl p-3 bg-[#0D203B] border border-sky-400/15 shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[#0A1930] rounded-xl border border-white/5 mb-3 text-xs font-mono text-[#9AAEC4]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D5F2]" />
              <span className="text-[#F3F7FC] font-semibold">SOURCE VIDEO PREVIEW</span>
            </div>
            <span>RAW BROADCAST FEED</span>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#061326] aspect-video flex items-center justify-center border border-white/5">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info & Launch Column */}
        <div className="rounded-2xl p-6 bg-[#0D203B] border border-sky-400/15 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-sky-400/10">
              <ShieldCheck className="w-4 h-4 text-[#00D5F2]" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#F3F7FC] uppercase">
                MATCH SPECIFICATIONS
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#0A1930] border border-white/5">
                <p className="text-[11px] text-[#9AAEC4] font-mono uppercase">Target Filename</p>
                <p className="text-sm text-[#F3F7FC] truncate font-mono mt-1 font-semibold">{file.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0A1930] border border-white/5">
                  <p className="text-[11px] text-[#9AAEC4] font-mono uppercase">File Size</p>
                  <p className="text-sm text-[#F3F7FC] font-mono mt-1 font-semibold">{formatSize(file.size)}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0A1930] border border-white/5">
                  <p className="text-[11px] text-[#9AAEC4] font-mono uppercase">Model Target</p>
                  <p className="text-sm text-[#00D5F2] font-mono mt-1 font-semibold">ResNet-18</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0A1930] border border-white/5">
                <p className="text-[11px] text-[#9AAEC4] font-mono uppercase">Pipeline Status</p>
                <p className="text-sm text-[#20D6A0] font-mono mt-1 flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 bg-[#20D6A0] rounded-full animate-pulse" />
                  READY FOR AI INFERENCE
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button 
              onClick={onAnalyze}
              className="w-full py-3.5 bg-[#00D5F2] hover:bg-[#38E1FA] text-[#061326] font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-cinematic tracking-wide cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#061326]" />
              LAUNCH RALLY EXTRACTION
            </button>
            
            <button 
              onClick={onCancel}
              className="w-full py-2.5 text-xs text-[#9AAEC4] hover:text-[#F3F7FC] transition-colors font-mono cursor-pointer"
            >
              Cancel & Select Different File
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
