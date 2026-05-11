// "use client";
// import React, { useRef, useState } from "react";
// import { Volume2, VolumeX, Play, Pause } from "lucide-react";
//
// // ── Replace this URL with your actual video URL ────────────────────────────
// const REEL_URL = "https://www.w3schools.com/html/mov_bbb.mp4"; // placeholder
//
// const stats = [
//   { value: "5+", label: "Years of craft" },
//   { value: "60+", label: "Projects shipped" },
//   { value: "3", label: "Continents reached" },
// ];
//
// const skills = ["Brand Identity", "UI/UX Design", "Motion", "Art Direction", "Design Systems", "Webflow"];
//
// // ── VideoPlayer ───────────────────────────────────────────────────────────────
// function VideoPlayer() {
//   const videoRef = useRef(null);
//   const [muted, setMuted] = useState(true);
//   const [playing, setPlaying] = useState(true);
//
//   const toggleMute = () => {
//     if (!videoRef.current) return;
//     videoRef.current.muted = !muted;
//     setMuted(!muted);
//   };
//
//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (playing) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
//     setPlaying(!playing);
//   };
//
//   return (
//     <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "9 / 12" }}>
//       {/* Video */}
//       <video
//         ref={videoRef}
//         src={REEL_URL}
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//
//       {/* Dark vignette */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
//
//       {/* Top label */}
//       <div className="absolute top-5 left-5">
//         <span className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
//           Showreel — 2026
//         </span>
//       </div>
//
//       {/* Controls */}
//       <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
//         <button
//           onClick={togglePlay}
//           className="w-10 h-10 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center hover:bg-[#B8593C] hover:text-[#F5F1E8] transition-colors"
//         >
//           {playing ? <Pause size={15} /> : <Play size={15} />}
//         </button>
//
//         <button
//           onClick={toggleMute}
//           className="w-10 h-10 rounded-full border border-white/30 text-white grid place-items-center backdrop-blur-sm hover:bg-white/10 transition-colors"
//         >
//           {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
//         </button>
//       </div>
//     </div>
//   );
// }
//
// // ── SkillPill ─────────────────────────────────────────────────────────────────
// function SkillPill({ label }) {
//   return (
//     <span className="font-mono-ui text-[10px] tracking-[0.18em] uppercase border border-[#141414]/20 text-[#141414]/70 px-3 py-1.5 rounded-full hover:border-[#B8593C] hover:text-[#B8593C] transition-colors cursor-default">
//       {label}
//     </span>
//   );
// }
//
// // ── MAIN ──────────────────────────────────────────────────────────────────────
// export default function Intro() {
//   return (
//     <section id="intro" className="py-24 md:py-32 border-t border-[#141414]/10">
//       <div className="max-w-[1400px] mx-auto px-6 md:px-10">
//
//         {/* Section label */}
//         <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-14">
//           <span className="w-8 h-px bg-[#141414]/40" />
//           About — A · 02
//         </div>
//
//         {/* Main grid */}
//         <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
//
//           {/* LEFT — Video */}
//           <div className="md:col-span-5">
//             <VideoPlayer />
//           </div>
//
//           {/* RIGHT — Content */}
//           <div className="md:col-span-7 md:pt-4 flex flex-col gap-10">
//
//             {/* Headline */}
//             <div>
//               <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.015em]">
//                 Craft-led design,{" "}
//                 <em className="italic text-[#B8593C] font-normal">rooted in{" "}</em>
//                 <em className="italic text-[#B8593C] font-normal">purpose.</em>
//               </h2>
//               <p className="mt-6 text-[16px] md:text-[17px] leading-[1.65] text-[#141414]/75 max-w-[54ch]">
//                 I'm Gopi — a designer who obsesses over the space between strategy and aesthetics.
//                 I work with founders, studios, and brands who believe good design isn't decoration —
//                 it's the product. My process is calm, collaborative, and always grounded in the{" "}
//                 <em className="italic">why</em> behind the work.
//               </p>
//             </div>
//
//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-px bg-[#141414]/15 border-y border-[#141414]/15">
//               {stats.map((s) => (
//                 <div key={s.label} className="bg-[#F5F1E8] py-8 px-6 flex flex-col">
//                   <span className="font-display text-[3rem] md:text-[3.5rem] leading-none text-[#B8593C]">
//                     {s.value}
//                   </span>
//                   <span className="mt-2 font-mono-ui text-[10px] tracking-[0.2em] uppercase text-[#141414]/60">
//                     {s.label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//
//             {/* Skills */}
//             <div>
//               <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/50 mb-4">
//                 Areas of focus
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((s) => (
//                   <SkillPill key={s} label={s} />
//                 ))}
//               </div>
//             </div>
//
//             {/* CTA row */}
//             <div className="flex flex-wrap items-center gap-6 pt-2">
//               <a
//                 href="/resume.pdf"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase border-b border-[#141414] pb-1 hover:text-[#B8593C] hover:border-[#B8593C] transition-colors"
//               >
//                 Download résumé
//               </a>
//               <a
//                 href="#contact"
//                 className="inline-flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/50 hover:text-[#141414] transition-colors"
//               >
//                 Let's talk →
//               </a>
//             </div>
//
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




















"use client";
import React, { useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, ArrowDownRight } from "lucide-react";

// ── Replace with your actual video ───────────────────────────────────────────
const REEL_URL = "/my-portfolio.mp4";

const stats = [
  { value: "5+",  label: "Years of craft" },
  { value: "60+", label: "Projects shipped" },
  { value: "3",   label: "Continents reached" },
];

const skills = [
  "Product Design",
  "UI/UX Design",
  "Mobile App Design",
  "Dashboard & Data Viz",
  "Design Systems",
  "Webflow Development",
];

// ── Video Player ──────────────────────────────────────────────────────────────
function VideoPlayer() {
  const videoRef = useRef(null);
  const [muted, setMuted]     = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };
  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-sm" style={{ height: "90vh", minHeight: 600, maxHeight: 560 }}>
      <video
        ref={videoRef}
        src={REEL_URL}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full object-cover"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

      {/* Top label */}
      <div className="absolute top-5 left-5">
        {/*<span className="font-mono-ui text-[10px] tracking-[0.26em] uppercase text-white/55">*/}
        {/*  Showreel — 2026*/}
        {/*</span>*/}
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex items-end justify-between gap-4">
        <div>

          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1] tracking-[-0.02em] text-[#F5F1E8]">
            Gopi Prajapati
            <em className="block italic text-[#B8593C] font-normal">Designer &amp; Creator</em>
          </h2>
        </div>

        <div className="flex items-center gap-2.5 mb-0.5">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center hover:bg-[#B8593C] hover:text-[#F5F1E8] transition-colors"
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full border border-white/25 text-white grid place-items-center backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Intro() {
  return (
    <section id="intro" className="py-24 md:py-32 border-t border-[#141414]/10">

      {/* Same container + padding as every other section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section label */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-10">
          <span className="w-8 h-px bg-[#141414]/40" />
          Introduction — A · 03
        </div>

        {/* ── Video — full width inside container ── */}
        <VideoPlayer />

        {/* ── Bio + Skills — below video, same container ── */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 pt-14 pb-16 md:pt-16 md:pb-20 border-b border-[#141414]/10">

          {/* Bio */}
          <div className="md:col-span-6">

            <p className="text-[17px] md:text-[19px] leading-[1.65] text-[#141414]/80 max-w-[52ch] mb-8">
              I'm a craft-led designer who lives at the intersection of strategy and
              aesthetics — where intentional thinking meets pixel-perfect execution.
              Every interface I craft begins with a deep understanding of the problem,
              the people it serves, and the business it needs to move.
            </p>

            <div className="w-8 h-[1.5px] bg-[#141414]/20 mb-8" />

            <ul className="flex flex-col gap-4 mb-10">
              {[
                { num: "01", text: "I shape experiences, not just screens — building design systems that scale." },
                { num: "02", text: "Visual languages that communicate before a single word is read." },
                { num: "03", text: "Calm, deliberate, and deeply collaborative by process." },
                { num: "04", text: "Purposeful, beautiful, and impossible to ignore — by standard." },
              ].map((item) => (
                <li key={item.num} className="flex items-start gap-4">
<span className="font-mono text-[11px] text-[#141414]/30 mt-[5px] shrink-0">
{item.num}
</span>
                  <span className="text-[15px] leading-[1.6] text-[#141414]/70">
{item.text}
</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-5">
<a
              href="#contact"
              className="group inline-flex items-center justify-between gap-5 rounded-full bg-[#141414] text-[#F5F1E8] pl-6 pr-2 py-2 hover:bg-[#B8593C] transition-colors"
              >
              <span className="font-display text-[17px]">Let's talk</span>
              <span className="w-10 h-10 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center transition-transform duration-300 group-hover:rotate-[-45deg]">
<ArrowDownRight size={16} />
</span>
            </a>
          </div>

        </div>


          {/* Skills list */}
          <div className="md:col-span-5 md:col-start-8">
            <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/50 mb-4">
              Areas of focus
            </div>
            <div className="flex flex-col divide-y divide-[#141414]/10">
              {skills.map((s, i) => (
                <div key={s} className="flex items-center justify-between py-4 group cursor-default">
                  <span className="font-display text-[20px] md:text-[22px] tracking-[-0.01em] group-hover:text-[#B8593C] transition-colors">
                    {s}
                  </span>
                  <span className="font-mono-ui text-[10px] tracking-[0.2em] text-[#141414]/35 group-hover:text-[#B8593C] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        {/*<div className="grid grid-cols-3 gap-px bg-[#141414]/10">*/}
        {/*  {stats.map((s) => (*/}
        {/*    <div key={s.label} className="bg-[#F5F1E8] py-10 px-6 md:px-10">*/}
        {/*      <span className="font-display text-[3.5rem] md:text-[5rem] leading-none text-[#B8593C]">*/}
        {/*        {s.value}*/}
        {/*      </span>*/}
        {/*      <p className="mt-2 font-mono-ui text-[10px] tracking-[0.2em] uppercase text-[#141414]/55">*/}
        {/*        {s.label}*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}

      </div>
    </section>
  );
}