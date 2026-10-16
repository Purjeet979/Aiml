import { motion } from 'framer-motion';

interface StudioLightProps {
  isOn: boolean;
}

export default function StudioLight({ isOn }: StudioLightProps) {
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center w-64 h-64"
      initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Spotlight Beam */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-[800px] origin-top opacity-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
          clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0% 100%)',
          filter: 'blur(8px)'
        }}
        animate={{ opacity: isOn ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Lamp Housing */}
      <div className="relative z-10 w-32 h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full border-4 border-gray-700 shadow-2xl flex items-center justify-center">
        {/* Inner Reflector */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden border border-gray-600">
          {/* Bulb */}
          <motion.div 
            className="w-12 h-12 rounded-full"
            initial={{ backgroundColor: '#222', boxShadow: '0 0 0px #fff' }}
            animate={isOn ? { 
              backgroundColor: '#fff', 
              boxShadow: '0 0 40px 10px rgba(255, 255, 255, 0.8)' 
            } : {
              backgroundColor: '#222', 
              boxShadow: '0 0 0px #fff'
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
      
      {/* Light Stand/Bracket */}
      <div className="absolute top-[80%] w-36 h-12 border-b-8 border-l-8 border-r-8 border-gray-800 rounded-b-xl z-0" />
    </motion.div>
  );
}
