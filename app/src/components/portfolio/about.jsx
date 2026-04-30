import React from "react";
import { profile } from "../../mock";

function PortraitBlock({ src }) {
    return (
        <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]/5 rounded-sm">
            <img
                src={src}
                alt="Gopi Prajapati, portrait"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-[filter,transform] duration-700 hover:scale-[1.03]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#F5F1E8] mix-blend-difference">
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

function AboutCopy() {
    return (
        <>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.01em] text-[#141414]">
                I’m Gopi — a UI/UX designer with 5+ years of experience crafting apps, websites, and dashboards.
            </h2>
            <div className="mt-8 space-y-5 text-[16px] md:text-[17px] leading-[1.7] text-[#141414]/75 max-w-[58ch]">
                <p>
                    I specialize in building clean, intuitive digital products that balance usability with strong visual design.
                    With a foundation in graphic design,I bring attention to detail, consistency, and brand clarity into every interface I create.
            
                </p>
                <p>
                  From concept to execution, I focus on delivering solutions that are not just functional, but thoughtfully designed for real users.
                </p>
            </div>
        </>
    );
}

function StatsBlock({ stats }) {
    return (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#141414]/15 pt-8">
            {stats.map((s) => (
                <div key={s.label}>
                    <div className="font-display text-4xl md:text-5xl text-[#141414] leading-none">
                        {s.value}
                    </div>
                    <div className="mt-2 font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60">
                        {s.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

function Recognition() {
    const items = [""];
    return (
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/70">
            {items.map((item, idx) => (
                <React.Fragment key={item}>
                    <span>{item}</span>
                    {idx < items.length - 1 && <span className="w-1 h-1 rounded-full bg-[#141414]/40" />}
                </React.Fragment>
            ))}
        </div>
    );
}

// function WorkspaceStrip({ workspace, moodboard }) {
//     return (
//         <div className="mt-20 grid md:grid-cols-12 gap-6">
//             <div className="md:col-span-7 aspect-[16/10] overflow-hidden rounded-sm">
//                 <img src/>
//             </div>
//             <div className="md:col-span-5 aspect-[16/10] overflow-hidden rounded-sm">
//                 <img src/>
//             </div>
//         </div>
//     );
// }

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 border-t border-[#141414]/10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-14">
                    <span className="w-8 h-px bg-[#141414]/40" />
                    About — A · 02
                </div>

                <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
                    <div className="md:col-span-5">
                        <PortraitBlock src={profile.portrait} />
                    </div>
                    <div className="md:col-span-7 md:pl-6">
                        <AboutCopy />
                        <StatsBlock stats={profile.stats} />
                        <Recognition />
                    </div>
                </div>

                {/*<WorkspaceStrip workspace={profile.workspace} moodboard={profile.moodboard} />*/}
            </div>
        </section>
    );
}
