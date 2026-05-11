import React from "react";
import { services } from "../../mock";
import { Check } from "lucide-react";

function ServiceHeader() {
    return (
        <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-5">
                    <span className="w-8 h-px bg-[#141414]/40" />
                    Services — S · 04
                </div>
                <h2 className="font-display text-[clamp(2rem,5.2vw,3.8rem)] leading-[1.02] tracking-[-0.015em]">
                    Four ways we can <em className="italic text-[#B8593C] font-normal">work together</em>.
                </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-[16px] md:text-[17px] leading-[1.7] text-[#141414]/75 md:pt-6">
                I design clean and consistent brand visuals that help businesses communicate better and connect with their audience. By focusing on clarity, balance, and detail, I create visuals that not only stand out but also feel professional and reliable.
            </p>
        </div>
    );
}

function Deliverables({ items }) {
    return (
        <ul className="mt-7 grid grid-cols-2 gap-y-2 gap-x-4">
            {items.map((d) => (
                <li
                    key={d}
                    className="flex items-center gap-2 font-mono-ui text-[11px] tracking-[0.12em] uppercase text-[#141414]/70"
                >
                    <span className="w-1 h-1 rounded-full bg-[#B8593C]" />
                    {d}
                </li>
            ))}
        </ul>
    );
}

function ServiceCard({ service }) {
    return (
        <div className="group relative bg-[#EFEADE] p-8 md:p-10 hover:bg-[#F5F1E8] transition-colors">
            <div className="flex items-center justify-between mb-6">
        <span className="font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60">
          {service.code}
        </span>
                <span className="w-10 h-10 rounded-full border border-[#141414]/25 grid place-items-center group-hover:bg-[#141414] group-hover:text-[#F5F1E8] group-hover:border-[#141414] transition-colors">
          <Check size={14} />
        </span>
            </div>
            <h3 className="font-display text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.01em] text-[#141414]">
                {service.title}
            </h3>
            <p className="mt-5 text-[15.5px] leading-[1.65] text-[#141414]/75 max-w-[52ch]">
                {service.description}
            </p>
            <Deliverables items={service.deliverables} />
        </div>
    );
}

export default function Services() {
    return (
        <section id="services" className="py-24 md:py-32 border-t border-[#141414]/10 bg-[#EFEADE]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <ServiceHeader />
                <div className="grid md:grid-cols-2 gap-px bg-[#141414]/15 border border-[#141414]/15">
                    {services.map((s) => (
                        <ServiceCard key={s.code} service={s} />
                    ))}
                </div>
            </div>
        </section>
    );
}
