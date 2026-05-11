import React from "react";
import { profile } from "../../mock";
import { ArrowDownRight, Star } from "lucide-react";


function HeroMeta() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-14 md:mb-20">
            <span>© 2021—2026 — Gopi Prajapati</span>
            <span className="hidden md:inline">{profile.location}</span>
            {/*<span>Portfolio Vol. 07</span>*/}
        </div>
    );
}

function HeroHeadline() {
    return (
        <h1 className="font-display text-[#141414] leading-[0.92] tracking-[-0.02em] text-[14vw] md:text-[10.5vw] lg:text-[9.2vw]">
            <span className="block " style={{ animationDelay: "0.05s" }}>Designing</span>
            <span className="block" style={{ animationDelay: "0.15s" }}>
        with <em className="italic text-[#B8593C] font-normal">intention</em>,
      </span>
            <span className="block " style={{ animationDelay: "0.25s" }}>crafted with care.</span>
        </h1>
    );
}

function HeroActions() {
    return (
        <div className="flex flex-col gap-4">
            <a
                href="#work"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-[#141414] text-[#F5F1E8] pl-6 pr-2 py-2 hover:bg-[#B8593C] transition-colors"
            >
                <span className="font-display text-[19px]">See selected work</span>
                <span className="w-11 h-11 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center transition-transform duration-300 group-hover:rotate-[-45deg]">
          <ArrowDownRight size={18} />
        </span>
            </a>
            <a
                href="#contact"
                className="inline-flex items-center justify-between rounded-full border border-[#141414]/20 px-6 py-3 hover:border-[#141414] transition-colors"
            >
                <span className="font-display text-[17px]">Start a project</span>
                <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-[#141414]/60">
          {profile.email}
        </span>
            </a>
        </div>
    );
}

function HeroSubRow() {
    return (
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-14 items-end">
            <div className="md:col-span-5 md:col-start-1">
                <div className="flex items-center gap-2 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/70 mb-4">
                    <Star size={12} className="text-[#B8593C]" fill="#B8593C" />
                    {profile.role}
                </div>
                <p className="text-[17px] md:text-[19px] leading-[1.55] text-[#141414]/80 max-w-[52ch]">
                    {profile.heroStatement}
                </p>
            </div>
            <div className="md:col-span-4 md:col-start-8">
                <HeroActions />
            </div>
        </div>
    );
}

function Marquee({ words }) {
    // Duplicate 3x for seamless loop; use stable content-based keys.
    const items = [
        ...words.map((w, i) => ({ w, k: `a-${w}-${i}` })),
        ...words.map((w, i) => ({ w, k: `b-${w}-${i}` })),
        ...words.map((w, i) => ({ w, k: `c-${w}-${i}` })),
    ];
    return (
        <div className="mt-24 md:mt-32 border-y border-[#141414]/15 bg-[#F5F1E8] overflow-hidden">
            <div className="flex marquee whitespace-nowrap py-6">
                {items.map(({ w, k }) => (
                    <span key={k} className="flex items-center gap-10 px-10">
            <span className="font-display text-4xl md:text-6xl text-[#141414]">{w}</span>
            <span className="w-2 h-2 rounded-full bg-[#B8593C]" />
          </span>
                ))}
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <section id="top" className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden grain">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <HeroMeta />
                <HeroHeadline />
                <HeroSubRow />


            </div>
            <Marquee words={profile.marqueeWords} />
        </section>
    );
}
