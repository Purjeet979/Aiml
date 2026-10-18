import { Users, Code2, BrainCircuit, Layers, Sparkles } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  tag: string;
  contributions: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Purjeet Shahu',
    role: 'ML & Pipeline Engineering',
    tag: 'Lead Architecture',
    contributions: 'Engineered the ResNet-18 convolutional transfer learning model, OpenCV video stream decoding, and asynchronous FastAPI inference server.',
    initials: 'PS'
  },
  {
    name: 'Kanksha Vanjare',
    role: 'Computer Vision & Data Systems',
    tag: 'CV Research',
    contributions: 'Curated and annotated the broadcast rally dataset, implemented court-lighting data augmentations, and optimized frame classification accuracy.',
    initials: 'KV'
  },
  {
    name: 'Anubhav Tiwari',
    role: 'Full Stack & Broadcast Analytics',
    tag: 'Systems & UX',
    contributions: 'Architected the sports broadcast user interface, interactive frame-accurate NLE detection timeline, and real-time video telemetry.',
    initials: 'AT'
  }
];

export default function AboutUs() {
  return (
    <section id="about-us" className="w-full bg-[#061326] py-24 sm:py-32 px-4 border-t border-sky-400/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1930] border border-sky-400/20 text-[#00D5F2] text-xs font-mono mb-4">
          <Users className="w-3.5 h-3.5 text-[#00D5F2]" />
          <span>ABOUT US · PROJECT CREATORS</span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl font-cinematic font-bold tracking-tight text-[#F3F7FC] text-center mb-3">
          Meet the Engineering Team
        </h2>

        <p className="text-sm sm:text-base text-[#9AAEC4] text-center max-w-2xl mb-14 leading-relaxed">
          The developers and machine learning researchers behind PlayPulse AI, built to revolutionize tennis video editing through deep learning and automated rally extraction.
        </p>

        {/* 3 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="rounded-2xl p-6 bg-[#0D203B] border border-sky-400/15 hover:border-sky-400/35 transition-all duration-200 flex flex-col justify-between shadow-lg relative group"
            >
              {/* Top Accent Line */}
              <div className="w-10 h-1 bg-[#00D5F2] rounded-full mb-6 group-hover:w-16 transition-all duration-300" />

              <div>
                {/* Avatar / Initials & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1930] border border-sky-400/30 text-[#00D5F2] font-mono font-bold text-base flex items-center justify-center shadow-inner">
                    {member.initials}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D5F2]/10 text-[#00D5F2] border border-[#00D5F2]/20 font-semibold uppercase">
                    {member.tag}
                  </span>
                </div>

                {/* Member Name */}
                <h3 className="text-xl sm:text-2xl font-cinematic font-bold text-[#F3F7FC] mb-1">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-xs font-mono text-[#20D6A0] mb-4 font-semibold uppercase tracking-wider">
                  {member.role}
                </p>

                {/* Contribution details */}
                <p className="text-xs sm:text-[13px] text-[#9AAEC4] leading-relaxed">
                  {member.contributions}
                </p>
              </div>

              {/* Bottom Tech Stamp */}
              <div className="pt-4 mt-6 border-t border-sky-400/10 flex items-center justify-between text-[11px] font-mono text-[#9AAEC4]/60">
                <span>PlayPulse AI Contributor</span>
                <Sparkles className="w-3 h-3 text-[#00D5F2]" />
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Footer Pill */}
        <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#9AAEC4] px-6 py-2.5 rounded-xl bg-[#0A1930] border border-white/5">
          <span className="flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5 text-[#00D5F2]" /> PyTorch & ResNet-18</span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-[#20D6A0]" /> OpenCV & Pillow</span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-[#00D5F2]" /> FastAPI & React</span>
        </div>
      </div>
    </section>
  );
}
