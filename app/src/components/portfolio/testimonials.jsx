import React, { useState } from "react";
import { testimonials, clients } from "../../mock";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

function NavButton({ label, onClick, children }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className="w-11 h-11 rounded-full border border-[#F5F1E8]/20 grid place-items-center hover:bg-[#F5F1E8] hover:text-[#141414] transition-colors"
        >
            {children}
        </button>
    );
}

function TestimonialCard({ item, index, total, onPrev, onNext }) {
    return (
        <div className="md:col-span-10">
            <blockquote className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.25] tracking-[-0.005em] text-[#F5F1E8]">
                “{item.quote}”
            </blockquote>
            <div className="mt-10 flex items-center justify-between flex-wrap gap-6">
                <div>
                    <div className="font-display text-xl">{item.name}</div>
                    <div className="font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#F5F1E8]/60 mt-1">
                        {item.title}
                    </div>
                </div>
                <div className="flex items-center gap-3">
          <span className="font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#F5F1E8]/50">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
                    <NavButton label="Previous testimonial" onClick={onPrev}>
                        <ChevronLeft size={16} />
                    </NavButton>
                    <NavButton label="Next testimonial" onClick={onNext}>
                        <ChevronRight size={16} />
                    </NavButton>
                </div>
            </div>
        </div>
    );
}

function ClientList({ items }) {
    return (
        <div className="mt-24 pt-10 border-t border-[#F5F1E8]/15">
            <div className="font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#F5F1E8]/50 mb-6">
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-5">
                {items.map((c) => (
                    <span
                        key={c}
                        className="font-display text-2xl md:text-3xl text-[#F5F1E8]/80 hover:text-[#B8593C] transition-colors"
                    >
            {c}
          </span>
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    const [i, setI] = useState(0);
    const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);
    const next = () => setI((v) => (v + 1) % testimonials.length);

    return (
        <section className="py-24 md:py-32 border-t border-[#141414]/10 bg-[#141414] text-[#F5F1E8]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#F5F1E8]/60 mb-12">
                    <span className="w-8 h-px bg-[#F5F1E8]/40" />
                    Kind Words — T · 07
                </div>

                <div className="grid md:grid-cols-12 gap-10 items-start">
                    <div className="md:col-span-1">
                        <Quote size={44} className="text-[#B8593C]" />
                    </div>
                    <TestimonialCard
                        item={testimonials[i]}
                        index={i}
                        total={testimonials.length}
                        onPrev={prev}
                        onNext={next}
                    />
                </div>

                <ClientList items={clients} />
            </div>
        </section>
    );
}
