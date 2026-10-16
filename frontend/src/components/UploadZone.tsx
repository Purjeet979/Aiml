import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, Film, Scissors, Activity, FileCheck2, ArrowUpRight } from 'lucide-react';

export default function UploadZone({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (file: File) => {
    if (file.type.startsWith('video/')) {
      onFileSelect(file);
    } else {
      alert("Please upload a valid video file (MP4, MOV, AVI, etc.)");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center"
    >
      {/* 1. Page Heading */}
      <div className="w-full text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1930] border border-sky-400/20 text-[#00D5F2] text-xs font-mono mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D5F2]" />
          <span>STAGE 01 · BROADCAST INGESTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-cinematic font-bold tracking-tight text-[#F3F7FC] mb-2">
          Match Ingestion
        </h1>
        <p className="text-sm sm:text-base text-[#9AAEC4] max-w-xl mx-auto leading-relaxed">
          Upload your full-length tennis broadcast to automatically detect active rallies and discard commercials, player downtime, and crowd breaks.
        </p>
      </div>

      {/* 2. Upload Panel (Prominent, Balanced, Sports-Tech) */}
      <div
        className={`relative w-full rounded-2xl transition-all duration-200 flex flex-col items-center justify-center p-8 sm:p-14 cursor-pointer group border ${
          isDragging 
            ? 'border-[#00D5F2] bg-[#0E2545] shadow-lg' 
            : 'border-sky-400/15 bg-[#0D203B] hover:border-sky-400/35 hover:bg-[#0E2340]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="hidden"
        />

        {/* Corner Reticles (Understated Court-Line Geometry) */}
        <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00D5F2]/40 rounded-tl-sm pointer-events-none group-hover:border-[#00D5F2] transition-colors" />
        <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00D5F2]/40 rounded-tr-sm pointer-events-none group-hover:border-[#00D5F2] transition-colors" />
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00D5F2]/40 rounded-bl-sm pointer-events-none group-hover:border-[#00D5F2] transition-colors" />
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00D5F2]/40 rounded-br-sm pointer-events-none group-hover:border-[#00D5F2] transition-colors" />

        {/* Upload Icon */}
        <div className="w-16 h-16 rounded-xl bg-[#0A1930] border border-sky-400/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
          <Upload className={`w-7 h-7 transition-colors duration-200 ${isDragging ? 'text-[#00D5F2]' : 'text-[#00D5F2] group-hover:text-[#F3F7FC]'}`} />
        </div>

        {/* Instructions */}
        <h2 className="text-xl sm:text-2xl font-cinematic font-bold tracking-tight mb-2 text-[#F3F7FC] text-center">
          {isDragging ? 'Release to Upload Broadcast' : 'Drag & Drop Tennis Video'}
        </h2>
        
        <p className="text-xs sm:text-sm text-[#9AAEC4] mb-6 text-center">
          or use the button below to browse your local computer
        </p>

        {/* Accessible Browse Files Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-6 py-2.5 rounded-lg bg-[#00D5F2] hover:bg-[#38E1FA] text-[#061326] font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm mb-6"
        >
          <span>Browse Match Files</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Compact Metadata Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#9AAEC4] font-mono pt-4 border-t border-sky-400/10 w-full max-w-lg">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A1930] border border-white/5">
            <Video className="w-3 h-3 text-[#00D5F2]" /> MP4 · MOV · AVI
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A1930] border border-white/5">
            <Film className="w-3 h-3 text-sky-400" /> Max 2GB File Size
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A1930] border border-white/5">
            <Activity className="w-3 h-3 text-[#20D6A0]" /> Up to 4K Broadcast
          </span>
        </div>
      </div>

      {/* 3. Row of 3 Feature Cards Beneath Upload Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6 text-left">
        <div className="p-4 rounded-xl bg-[#0D203B] border border-sky-400/10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-[#0A1930] text-[#00D5F2]">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono font-bold uppercase text-[#F3F7FC]">Rally Extraction</h3>
          </div>
          <p className="text-[12px] text-[#9AAEC4] leading-relaxed">
            ResNet-18 Deep Learning identifies active court rallies versus crowd cuts and player downtime.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0D203B] border border-sky-400/10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-[#0A1930] text-[#00D5F2]">
              <Scissors className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono font-bold uppercase text-[#F3F7FC]">Zero Dead-Time</h3>
          </div>
          <p className="text-[12px] text-[#9AAEC4] leading-relaxed">
            Eliminates sideline changeovers, commercials, towel breaks, and between-point walks.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0D203B] border border-sky-400/10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-[#0A1930] text-[#20D6A0]">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono font-bold uppercase text-[#F3F7FC]">Export Highlights</h3>
          </div>
          <p className="text-[12px] text-[#9AAEC4] leading-relaxed">
            Generates a clean, action-only highlight reel encoded in H.264 MP4 for instant download.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
