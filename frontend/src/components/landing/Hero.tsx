import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, ScanSearch, ArrowRight, Video } from 'lucide-react';
import { useRef } from 'react';

export default function Hero({ onUploadClick }: { onUploadClick: () => void }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-[100svh] flex flex-col items-center justify-between overflow-hidden pt-28 pb-10"
    >
      {/* Background Court Geometry & AI Scanline */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,213,242,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,213,242,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)]" />
        
        {/* Subtle Scanning Beam */}
        <motion.div 
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D5F2]/50 to-transparent" 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pt-16 sm:pt-20">
        {/* Sports-Tech Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/20 bg-[#0A1930]/85 mb-8 backdrop-blur-md shadow-sm"
        >
          <ScanSearch className="w-4 h-4 text-[#00D5F2]" />
          <span className="text-xs font-mono font-medium tracking-wider text-[#F3F7FC] uppercase">
            AI-POWERED TENNIS ANALYSIS
          </span>
          <span className="text-xs text-[#9AAEC4]/50">•</span>
          <span className="text-xs font-mono text-[#20D6A0]">RESNET-18</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-8xl font-cinematic font-bold tracking-tight leading-[1.05] mb-6 text-[#F3F7FC] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          WATCH THE PLAY.<br/>
          <span className="text-gradient">SKIP THE WAIT.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-[#9AAEC4] max-w-2xl mb-12 font-normal leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Our ResNet-18 pipeline automatically detects and extracts active rallies from full-length tennis broadcasts, giving you pure action in minutes.
        </motion.p>

        {/* Premium Action Button Card (Upload Match Video) */}
        <motion.div 
          className="w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button 
            onClick={onUploadClick}
            type="button"
            className="w-full group relative text-left p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0A1930]/95 via-[#0D203B]/90 to-[#061326]/95 border border-sky-400/25 hover:border-[#00D5F2] shadow-xl hover:shadow-[0_0_40px_-8px_rgba(0,213,242,0.35)] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
          >
            {/* Subtle radial glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00D5F2]/10 rounded-full blur-2xl group-hover:bg-[#00D5F2]/25 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#00D5F2]/10 border border-[#00D5F2]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#00D5F2] transition-all duration-300 shadow-[0_0_15px_-3px_rgba(0,213,242,0.2)]">
                  <Upload className="w-6 h-6 text-[#00D5F2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#20D6A0] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider text-[#20D6A0] uppercase font-semibold">
                      READY FOR INGESTION
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-cinematic font-bold text-[#F3F7FC] tracking-wide group-hover:text-[#00D5F2] transition-colors uppercase">
                    UPLOAD MATCH VIDEO
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9AAEC4] mt-1 leading-snug">
                    Ingest full broadcast footage (MP4, MOV, MKV) to extract clean tennis rallies
                  </p>
                </div>
              </div>

              {/* Right CTA Button Badge */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10 gap-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D5F2] text-[#061326] font-cinematic font-bold text-xs uppercase tracking-wider group-hover:bg-[#38E1FA] transition-all shadow-md group-hover:translate-x-0.5">
                  <Video className="w-3.5 h-3.5 text-[#061326]" />
                  <span>START PIPELINE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] font-mono text-[#9AAEC4]/70">
                  ResNet-18 • Auto Trim
                </span>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="relative mt-12 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-[0.3em] font-cinematic uppercase text-[#9AAEC4]">Scroll to explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#9AAEC4] to-transparent" />
      </motion.div>
    </motion.div>
  );
}
