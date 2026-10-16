import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { tennisImages } from '../../data/tennisImages';

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Preload images to ensure smooth transitions
  useEffect(() => {
    tennisImages.forEach((img) => {
      const image = new Image();
      image.src = img.url;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  const activeImageIndex = useTransform(scrollYProgress, 
    [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8], 
    [0, 0,    1,   1,    2,   2,    3,   3,    4]
  );

  return (
    <div ref={containerRef} id="story-timeline" className="relative w-full bg-transparent text-[#F3F7FC] pt-20 pb-40">
      
      {/* STICKY VISUAL GALLERY (Top on mobile, Left on desktop) */}
      <div className="sticky top-0 h-[50vh] lg:h-screen w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-16 overflow-hidden z-10 bg-transparent">
        <motion.div className="relative w-full aspect-video md:aspect-[4/5] lg:aspect-square max-w-lg perspective-[1000px]">
          {tennisImages.map((img, idx) => {
            const opacity = useTransform(activeImageIndex, 
              [idx - 1, idx, idx + 1], 
              [0, 1, 0]
            );
            
            const scale = useTransform(activeImageIndex,
              [idx - 1, idx, idx + 1], 
              [0.85, 1, 1.15]
            );
            
            const zIndex = useTransform(activeImageIndex,
              (latest) => Math.round(latest) === idx ? 50 : 10
            );

            return (
              <motion.div
                key={img.id}
                style={{ opacity, scale, zIndex }}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-sky-400/20 shadow-2xl bg-[#061326]"
              >
                <img 
                  src={img.url} 
                  alt="" 
                  className="w-full h-full object-cover opacity-75 bg-[#0A1930]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(45deg, #061326, #0A1930)';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061326] via-[#061326]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#00D5F2] text-xs font-mono tracking-widest uppercase mb-1.5 font-semibold">{img.category}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold font-cinematic uppercase text-[#F3F7FC]">{img.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* SCROLLING CONTENT & SVG PATH (Bottom on mobile, Right on desktop) */}
      <div className="relative w-full lg:w-1/2 lg:ml-auto z-20 px-4 lg:px-20 lg:-mt-[100vh]">
        
        {/* MOBILE Vertical Line */}
        <div className="absolute left-6 top-[10vh] bottom-[10vh] w-[2px] bg-sky-400/10 md:hidden z-0 rounded-full">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-[#00D5F2] origin-top rounded-full"
            style={{ scaleY: pathLength, height: '100%' }}
          />
        </div>

        {/* DESKTOP Curved S-Path SVG */}
        <div className="absolute left-8 lg:left-20 top-0 bottom-0 w-24 z-0 hidden md:block">
          <svg viewBox="0 0 100 2000" preserveAspectRatio="none" className="w-full h-full stroke-sky-400/10" fill="none" strokeWidth="2">
            <path d="M 50 0 C 50 200, 100 300, 100 500 C 100 700, 0 800, 0 1000 C 0 1200, 100 1300, 100 1500 C 100 1700, 50 1800, 50 2000" />
          </svg>
          <motion.svg viewBox="0 0 100 2000" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full stroke-[#00D5F2]" fill="none" strokeWidth="3">
            <motion.path 
              d="M 50 0 C 50 200, 100 300, 100 500 C 100 700, 0 800, 0 1000 C 0 1200, 100 1300, 100 1500 C 100 1700, 50 1800, 50 2000" 
              style={{ pathLength }}
            />
          </motion.svg>
        </div>

        {/* Checkpoints */}
        <div className="relative z-10 py-[10vh] lg:py-[25vh] flex flex-col gap-[35vh] lg:gap-[50vh]">
          
          {/* Checkpoint 01 */}
          <div className="pl-12 md:pl-28 max-w-xl">
            <h4 className="text-[#00D5F2] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">01 — THE BROADCAST</h4>
            <h2 className="text-3xl lg:text-5xl font-bold font-cinematic uppercase leading-tight mb-5 text-[#F3F7FC]">
              A TWO-HOUR MATCH<br/>
              ISN'T TWO HOURS OF PLAY.
            </h2>
            <p className="text-[#9AAEC4] text-base leading-relaxed">
              When watching or analyzing full broadcasts, majority of footage is spent on commercial cuts, player towel walks, audience reactions, and changeovers.
            </p>
          </div>

          {/* Checkpoint 02 */}
          <div className="pl-12 md:pl-28 max-w-xl">
            <h4 className="text-[#00D5F2] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">02 — THE PROBLEM</h4>
            <h2 className="text-3xl lg:text-5xl font-bold font-cinematic uppercase leading-tight mb-5 text-[#F3F7FC]">
              FINDING THE ACTION<br/>
              TAKES TOO LONG.
            </h2>
            
            {/* Visual Timeline Graphic */}
            <div className="p-5 rounded-2xl bg-[#0D203B] border border-sky-400/15 mb-4">
              <div className="flex justify-between text-xs font-mono text-[#9AAEC4] mb-2">
                <span>00:00:00</span>
                <span>02:14:32</span>
              </div>
              <div className="w-full h-7 flex rounded-lg overflow-hidden border border-white/5 bg-[#061326] mb-3">
                <div className="h-full bg-[#0A1930] w-[15%]" title="Non-Play" />
                <div className="h-full bg-[#00D5F2] w-[20%]" title="Play Detected" />
                <div className="h-full bg-[#0A1930] w-[30%]" title="Non-Play" />
                <div className="h-full bg-[#00D5F2] w-[15%]" title="Play Detected" />
                <div className="h-full bg-[#0A1930] w-[20%]" title="Non-Play" />
              </div>
              <p className="text-xs text-[#9AAEC4] font-mono text-center">MANUAL TIMELINE TRIMMING WASTES VALUABLE PRODUCTION HOURS.</p>
            </div>
          </div>

          {/* Checkpoint 03 */}
          <div className="pl-12 md:pl-28 max-w-xl">
            <h4 className="text-[#00D5F2] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">03 — THE AI PIPELINE</h4>
            <h2 className="text-3xl lg:text-5xl font-bold font-cinematic uppercase leading-tight mb-5 text-[#F3F7FC]">
              FRAME-BY-FRAME<br/>
              DEEP LEARNING.
            </h2>
            <p className="text-[#9AAEC4] text-base mb-6 leading-relaxed">
              Instead of manual scrubbing, our computer vision pipeline extracts frames and processes them through an optimized PyTorch ResNet-18 neural network.
            </p>
            
            {/* AI Visualization */}
            <div className="p-5 rounded-2xl bg-[#0D203B] border border-sky-400/15 flex flex-col items-center">
              <div className="w-full py-2.5 border border-white/10 rounded-lg flex items-center justify-center bg-[#0A1930] mb-2 font-mono text-xs text-[#9AAEC4]">
                RAW BROADCAST FRAME (224x224 TENSOR)
              </div>
              <div className="w-[1px] h-3 bg-[#00D5F2]" />
              <div className="w-full py-2.5 border border-[#00D5F2]/40 rounded-lg flex items-center justify-center bg-[#00D5F2]/10 mb-2 font-mono text-xs text-[#00D5F2] font-semibold">
                RESNET-18 CONVOLUTIONAL CLASSIFIER
              </div>
              <div className="w-[1px] h-3 bg-[#00D5F2]" />
              <div className="w-full py-2.5 border border-[#20D6A0]/40 rounded-lg flex items-center justify-center bg-[#20D6A0]/10 font-mono text-xs text-[#20D6A0] font-semibold">
                ACTIVE RALLY CONFIRMED : 97.4%
              </div>
            </div>
          </div>

          {/* Checkpoint 04 */}
          <div className="pl-12 md:pl-28 max-w-xl">
            <h4 className="text-[#00D5F2] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">04 — AUTOMATED FILTER</h4>
            <h2 className="text-3xl lg:text-5xl font-bold font-cinematic uppercase leading-tight mb-5 text-[#F3F7FC]">
              ISOLATE RALLIES.<br/>
              DISCARD THE NOISE.
            </h2>
            <p className="text-[#9AAEC4] text-base leading-relaxed">
              The AI automatically cuts crowd reaction shots, commercials, and sideline walks. Only the active competitive points are retained.
            </p>
          </div>

          {/* Checkpoint 05 */}
          <div className="pl-12 md:pl-28 max-w-xl pb-[10vh] lg:pb-[15vh]">
            <h4 className="text-[#00D5F2] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">05 — PURE ACTION REEL</h4>
            <h2 className="text-3xl lg:text-5xl font-bold font-cinematic uppercase leading-tight mb-5 text-[#F3F7FC]">
              JUST THE PLAY.<br/>
              READY IN MINUTES.
            </h2>
            
            <div className="p-6 rounded-2xl bg-[#0D203B] border border-sky-400/15 mt-6">
              <div className="flex justify-between items-end border-b border-sky-400/10 pb-4 mb-4">
                <div>
                  <p className="text-xs text-[#9AAEC4] font-mono uppercase">Raw Match</p>
                  <p className="text-lg text-[#9AAEC4] font-mono font-semibold">02:14:32</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#00D5F2] font-mono uppercase font-bold">Action Cut</p>
                  <p className="text-3xl text-[#F3F7FC] font-mono font-bold">01:07:48</p>
                </div>
              </div>
              <p className="text-xs text-center text-[#20D6A0] font-mono">Over 50% of broadcast dead time eliminated automatically.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
