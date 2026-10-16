import { motion } from 'framer-motion';
import { Camera, Cpu, CheckCircle2, Scissors } from 'lucide-react';

export default function Hero({ onUploadClick }: { onUploadClick: () => void }) {
  return (
    <div className="relative pt-6 pb-20 md:pt-10 md:pb-28 flex flex-col items-center justify-center overflow-hidden">
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Professional Sports-Tech Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-400/20 bg-[#0A1930]/80 mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D5F2]" />
          <span className="text-xs font-mono font-medium tracking-wider text-[#F3F7FC]">
            SPORTS BROADCAST AI PIPELINE
          </span>
          <span className="text-xs font-mono text-[#9AAEC4]/60">•</span>
          <span className="text-xs font-mono text-[#20D6A0]">RESNET-18</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          className="text-5xl sm:text-7xl md:text-8xl font-cinematic font-bold tracking-tight leading-[1.02] mb-5 text-[#F3F7FC]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          WATCH THE PLAY.<br />
          <span className="text-[#00D5F2]">SKIP THE WAIT.</span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p 
          className="text-base sm:text-lg text-[#9AAEC4] max-w-2xl mb-8 leading-relaxed font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          An end-to-end deep learning pipeline that automatically processes full-length tennis broadcasts to extract pure rally segments — eliminating commercials, player walks, and crowd breaks into a clean highlight reel.
        </motion.p>

        {/* Action Button Card */}
        <motion.div 
          className="w-full max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            onClick={onUploadClick}
            type="button"
            className="w-full group relative text-left p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0A1930]/95 via-[#0D203B]/90 to-[#061326]/95 border border-sky-400/25 hover:border-[#00D5F2] shadow-xl hover:shadow-[0_0_40px_-8px_rgba(0,213,242,0.35)] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00D5F2]/10 border border-[#00D5F2]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#00D5F2] transition-all duration-300">
                  <Camera className="w-6 h-6 text-[#00D5F2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#20D6A0] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider text-[#20D6A0] uppercase font-semibold">
                      READY FOR INGESTION
                    </span>
                  </div>
                  <h3 className="text-xl font-cinematic font-bold text-[#F3F7FC] tracking-wide group-hover:text-[#00D5F2] transition-colors uppercase">
                    UPLOAD MATCH VIDEO
                  </h3>
                  <p className="text-xs text-[#9AAEC4] mt-1 leading-snug">
                    Ingest full broadcast footage to extract clean tennis rallies
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D5F2] text-[#061326] font-cinematic font-bold text-xs uppercase tracking-wider group-hover:bg-[#38E1FA] transition-all shadow-md">
                  <span>START PIPELINE</span>
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Supporting Tennis Photography Visual Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-4xl rounded-2xl overflow-hidden border border-sky-400/15 bg-[#0D203B] shadow-2xl relative"
        >
          {/* Card Broadcast Header Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-[#0A1930] border-b border-sky-400/10 text-xs font-mono text-[#9AAEC4]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#20D6A0] animate-pulse" />
              <span className="text-[#F3F7FC] font-semibold">FEED A · RALLY EXTRACTION</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#00D5F2]">AI CONFIDENCE 97.4%</span>
              <span className="hidden sm:inline">1080P @ 60FPS</span>
            </div>
          </div>

          {/* Real Tennis Rally Image */}
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-[#061326]">
            <img 
              src="/images/rally1.jpg" 
              alt="Tennis court active rally point" 
              className="w-full h-full object-cover object-center opacity-85"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D203B] via-transparent to-transparent opacity-80" />
            
            {/* HUD Callout Overlays */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#061326]/80 backdrop-blur-sm border border-sky-400/20 text-[11px] font-mono text-[#00D5F2] flex items-center gap-1.5">
              <span>● ACTIVE PLAY</span>
              <span className="text-[#9AAEC4]">(CLASS 1)</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#F3F7FC]">
              <div className="flex items-center gap-2 bg-[#061326]/80 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#20D6A0]" />
                <span>Baseline Rally Detected</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#9AAEC4] bg-[#061326]/80 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
                <span>Total Match: 02h 14m</span>
                <span>→</span>
                <span className="text-[#00D5F2] font-semibold">Action Cut: 01h 07m</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-8 text-left">
          <div className="p-4 rounded-xl bg-[#0A1930] border border-sky-400/10 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-400/10 text-[#00D5F2] shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-[#F3F7FC]">Frame-by-Frame AI</h3>
              <p className="text-[12px] text-[#9AAEC4] mt-0.5 leading-snug">ResNet-18 classifies every broadcast frame with sub-second accuracy.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0A1930] border border-sky-400/10 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-400/10 text-[#00D5F2] shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-[#F3F7FC]">Zero Manual Editing</h3>
              <p className="text-[12px] text-[#9AAEC4] mt-0.5 leading-snug">Automatically removes commercials, sideline breaks, and walks.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0A1930] border border-sky-400/10 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-400/10 text-[#20D6A0] shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-[#F3F7FC]">Broadcast Ready</h3>
              <p className="text-[12px] text-[#9AAEC4] mt-0.5 leading-snug">Exports seamless H.264 highlights ready for analysis or media distribution.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
