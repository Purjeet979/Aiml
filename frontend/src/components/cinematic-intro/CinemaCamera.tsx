import { motion } from 'framer-motion';

interface CinemaCameraProps {
  isFocused: boolean;
  shutterFired: boolean;
}

export default function CinemaCamera({ isFocused, shutterFired }: CinemaCameraProps) {
  return (
    <motion.div 
      className="relative flex items-center justify-center w-80 h-80"
      initial={{ x: -100, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Camera Body Concept - mostly facing forward so we see the huge lens */}
      <div className="absolute w-64 h-56 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl flex items-center justify-center">
        {/* Tally Light (Red dot) */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        
        {/* The Lens Assembly */}
        <div className="relative w-48 h-48 rounded-full border-8 border-gray-900 bg-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.8)_inset] flex items-center justify-center">
          {/* Focus Ring / Zoom effect */}
          <motion.div 
            className="absolute inset-2 rounded-full border-[12px] border-dashed border-gray-700"
            animate={{ rotate: isFocused ? 30 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Inner Glass */}
          <motion.div 
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-gray-900 overflow-hidden border-2 border-blue-500/20"
            animate={{ filter: isFocused ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Glass reflection */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/20 rounded-full blur-sm" />

            {/* Aperture Blades */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <motion.div
                  key={deg}
                  className="absolute w-12 h-24 bg-gray-950 origin-bottom"
                  style={{ rotate: deg, bottom: '50%' }}
                  initial={{ scaleY: 0.1, skewX: -20 }}
                  animate={shutterFired ? { scaleY: 1 } : { scaleY: 0.1 }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              ))}
            </div>
            
            {/* Sensor dot */}
            <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-purple-500/30 blur-[2px]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
