import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import StudioLight from './cinematic-intro/StudioLight';
import CinemaCamera from './cinematic-intro/CinemaCamera';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'init' | 'light_off' | 'light_on' | 'camera_enter' | 'camera_focus' | 'action_text' | 'shutter' | 'flash' | 'done'>('init');

  useEffect(() => {
    // For quick development replay support
    const skip = sessionStorage.getItem('intro_played');
    if (skip && !window.location.search.includes('replay=true')) {
      onComplete();
      return;
    }

    // Precise timeline sequencing
    const timers = [
      // 0.3s - Light object appears
      setTimeout(() => setPhase('light_off'), 300),
      
      // 0.5s - Light powers ON (LIGHTS.)
      setTimeout(() => setPhase('light_on'), 500),
      
      // 1.2s - Camera enters
      setTimeout(() => setPhase('camera_enter'), 1200),
      
      // 1.8s - Lens focus animation (CAMERA.)
      setTimeout(() => setPhase('camera_focus'), 1800),
      
      // 2.3s - "ACTION." appears
      setTimeout(() => setPhase('action_text'), 2300),
      
      // 2.8s - Shutter sequence
      setTimeout(() => setPhase('shutter'), 2800),
      
      // 2.9s - FLASH!
      setTimeout(() => setPhase('flash'), 2900),
      
      // 3.05s - Complete
      setTimeout(() => {
        setPhase('done');
        sessionStorage.setItem('intro_played', 'true');
        onComplete();
      }, 3100),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-cinematic select-none">
      
      {/* 1. STUDIO LIGHT */}
      <AnimatePresence>
        {(phase === 'light_off' || phase === 'light_on') && (
          <motion.div 
            className="absolute flex flex-col items-center gap-12"
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
          >
            <StudioLight isOn={phase === 'light_on'} />
            
            <motion.h1 
              className="text-6xl md:text-8xl tracking-[0.3em] font-light text-white uppercase"
              initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
              animate={phase === 'light_on' ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              LIGHTS.
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMA CAMERA */}
      <AnimatePresence>
        {(phase === 'camera_enter' || phase === 'camera_focus' || phase === 'action_text' || phase === 'shutter') && (
          <motion.div 
            className="absolute flex flex-col items-center gap-12"
            exit={{ opacity: 0 }} // Flash handles the exit visually
          >
            <motion.div
              animate={phase === 'shutter' ? { x: [0, -5, 5, -2, 0], y: [0, 3, -3, 2, 0] } : {}}
              transition={{ duration: 0.1 }}
            >
              <CinemaCamera 
                isFocused={phase === 'camera_focus' || phase === 'action_text' || phase === 'shutter'} 
                shutterFired={phase === 'shutter'} 
              />
            </motion.div>

            {/* CAMERA TEXT */}
            <AnimatePresence mode="wait">
              {(phase === 'camera_enter' || phase === 'camera_focus') && (
                <motion.h1 
                  key="camera_text"
                  className="absolute top-[120%] text-6xl md:text-8xl tracking-[0.3em] font-light text-white uppercase"
                  initial={{ opacity: 0, filter: 'blur(20px)' }}
                  animate={phase === 'camera_focus' ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0 }}
                  exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  CAMERA.
                </motion.h1>
              )}

              {/* ACTION TEXT */}
              {(phase === 'action_text' || phase === 'shutter') && (
                <motion.h1 
                  key="action_text"
                  className="absolute top-[120%] text-6xl md:text-8xl tracking-[0.3em] font-bold text-white uppercase"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ACTION.
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SCREEN FLASH OVERLAY */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div 
            className="absolute inset-0 bg-white z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
