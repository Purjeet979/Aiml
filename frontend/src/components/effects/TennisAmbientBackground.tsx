export default function TennisAmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* 1. Low-opacity Radial Lights (Restrained Sports-Tech Ambience) */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 900px 500px at 50% -5%, rgba(0, 213, 242, 0.08), transparent 70%),
            radial-gradient(ellipse 700px 450px at 85% 45%, rgba(10, 25, 48, 0.6), transparent 70%),
            radial-gradient(ellipse 650px 450px at 15% 75%, rgba(13, 32, 59, 0.5), transparent 70%)
          `
        }}
      />

      {/* 2. Restrained Technical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* 3. Subtle Tennis Court Geometry (Baseline, Service Boxes, Center Mark) */}
      <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
        <svg className="w-full max-w-6xl h-full max-h-[85vh]" viewBox="0 0 1000 600" fill="none" stroke="#00D5F2" strokeWidth="1.5">
          {/* Outer Court Boundary */}
          <rect x="100" y="50" width="800" height="500" strokeDasharray="4 4" />
          {/* Singles Sidelines */}
          <line x1="100" y1="100" x2="900" y2="100" />
          <line x1="100" y1="500" x2="900" y2="500" />
          {/* Baseline Markers */}
          <line x1="100" y1="290" x2="100" y2="310" strokeWidth="2.5" />
          <line x1="900" y1="290" x2="900" y2="310" strokeWidth="2.5" />
          {/* Center Net Line */}
          <line x1="500" y1="40" x2="500" y2="560" stroke="#00D5F2" strokeWidth="2" />
          {/* Service Lines */}
          <line x1="280" y1="100" x2="280" y2="500" />
          <line x1="720" y1="100" x2="720" y2="500" />
          {/* Center Service Line */}
          <line x1="280" y1="300" x2="720" y2="300" />
        </svg>
      </div>

      {/* 4. Subtle Broadcast Status Markers */}
      <div className="absolute top-20 left-8 text-[11px] font-mono tracking-widest text-[#9AAEC4]/30 select-none hidden xl:block">
        <div>BROADCAST · COURT 01</div>
        <div>PLAYFILTER AI ENGINE</div>
      </div>

      <div className="absolute top-20 right-8 text-[11px] font-mono tracking-widest text-[#9AAEC4]/30 select-none hidden xl:block text-right">
        <div>RESNET-18 · 1080P/4K</div>
        <div>ACTIVE RALLY ISOLATION</div>
      </div>
    </div>
  );
}
