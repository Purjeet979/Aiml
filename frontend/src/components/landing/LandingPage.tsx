import Hero from './Hero';
import StoryTimeline from './StoryTimeline';
import AboutUs from './AboutUs';

export default function LandingPage({ onUploadClick }: { onUploadClick: () => void }) {
  return (
    <div className="w-full flex flex-col">
      {/* 1. The Hero Section */}
      <Hero onUploadClick={onUploadClick} />
      
      {/* 2. The Story Journey (Checkpoints 1-5) */}
      <StoryTimeline />

      {/* 3. About Us / Engineering Team Section */}
      <AboutUs />

      {/* 4. Final CTA Section */}
      <div className="w-full bg-[#061326] py-24 sm:py-32 flex flex-col items-center justify-center text-center px-4 border-t border-sky-400/10 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1930] border border-sky-400/20 text-[#00D5F2] text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-[#20D6A0]" />
          <span>INSTANT TENNIS HIGHLIGHT PIPELINE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinematic font-bold uppercase mb-4 text-[#F3F7FC] max-w-2xl leading-tight">
          Ready to Extract the Action?
        </h2>
        
        <p className="text-sm sm:text-base text-[#9AAEC4] max-w-xl mb-8 leading-relaxed">
          Upload any match broadcast footage. PlayPulse AI will filter out all non-play footage and deliver clean, action-only highlight reels in minutes.
        </p>

        <button 
          onClick={onUploadClick}
          className="px-10 py-4 bg-[#00D5F2] hover:bg-[#38E1FA] text-[#061326] font-bold font-cinematic uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-sm"
        >
          UPLOAD MATCH BROADCAST
        </button>
      </div>
    </div>
  );
}
