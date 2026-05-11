import React from "react";
import { process } from "../../mock";

export default function Process() {
    return (
        <section id="process" className="py-24 md:py-32 border-t border-[#141414]/10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-10">
                    <span className="w-8 h-px bg-[#141414]/40" />
                    Process — P · 06
                </div>

                <h2 className="font-display text-[clamp(2rem,5.4vw,4rem)] leading-[1.02] tracking-[-0.015em] max-w-[20ch] mb-16">
                    A calm, collaborative <em className="italic text-[#B8593C] font-normal">four-step</em> rhythm.
                </h2>

                <div className="grid md:grid-cols-4 gap-px bg-[#141414]/15 border-y border-[#141414]/15">
                    {process.map((p) => (
                        <div key={p.step} className="bg-[#F5F1E8] p-8 md:p-10 min-h-[260px] flex flex-col">
                            <div className="font-display text-6xl md:text-7xl text-[#B8593C] leading-none">
                                {p.step}
                            </div>
                            <h3 className="mt-6 font-display text-2xl md:text-[28px] tracking-[-0.01em]">
                                {p.title}
                            </h3>
                            <p className="mt-3 text-[14.5px] leading-[1.65] text-[#141414]/75">
                                {p.body}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
                    <p className="text-[15px] text-[#141414]/70 max-w-[62ch]">
                    
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase border-b border-[#141414] pb-1 hover:text-[#B8593C] hover:border-[#B8593C] transition-colors"
                    >
                        Request a sample proposal
                    </a>
                </div>
            </div>
        </section>
    );
}
