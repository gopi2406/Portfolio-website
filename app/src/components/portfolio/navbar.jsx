import React, { useEffect, useState } from "react";
import { nav, profile } from "../../mock";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color,padding] duration-300 ${
                scrolled
                    ? "bg-[#F5F1E8]/85 backdrop-blur-md border-b border-[#141414]/10 py-3"
                    : "bg-transparent border-b border-transparent py-5"
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
                {/* Logo */}
                <a href="#top" className="flex items-center gap-3 group">
                    <span className="w-9 h-9 rounded-full bg-[#141414] text-[#F5F1E8] grid place-items-center font-display text-lg leading-none transition-transform duration-300 group-hover:rotate-[18deg]">
                        G
                    </span>
                    <span>
                        <span className="font-display text-[17px] leading-none">Gopi Prajapati</span>
                        <span className="block font-mono-ui text-[10px] tracking-[0.18em] uppercase text-[#141414]/60 mt-1">
                            Designer — Portfolio / 2026
                        </span>
                    </span>
                </a>

                {/* Desktop nav — hidden at 768px and below */}
                <nav className="hidden min-[769px]:flex items-center gap-8">
                    {nav.map((n) => (
                        <a
                            key={n.label}
                            href={n.href}
                            className="font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/70 hover:text-[#B8593C] transition-colors"
                        >
                            {n.label}
                        </a>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {profile.available && (
                        <span className="hidden min-[769px]:inline-flex items-center gap-2 font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8593C] animate-pulse" />
                            Available
                        </span>
                    )}
                    <a
                        href="#contact"
                        className="hidden min-[769px]:inline-flex items-center gap-2 rounded-full bg-[#141414] text-[#F5F1E8] pl-4 pr-3 py-2 text-[12px] tracking-wide hover:bg-[#B8593C] transition-colors"
                    >
                        Let's talk <ArrowUpRight size={14} />
                    </a>

                    {/* Hamburger — only at 768px and below */}
                    <button
                        aria-label="Menu"
                        className="min-[769px]:hidden p-2 rounded-full bg-[#141414] text-[#F5F1E8]"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown — only at 768px and below */}
            {open && (
                <div className="min-[769px]:hidden border-t border-[#141414]/10 bg-[#F5F1E8]">
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {nav.map((n) => (
                            <a
                                key={n.label}
                                href={n.href}
                                onClick={() => setOpen(false)}
                                className="font-display text-2xl text-[#141414]"
                            >
                                {n.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="mt-2 inline-flex items-center justify-between rounded-full bg-[#141414] text-[#F5F1E8] px-5 py-3"
                        >
                            Let's talk <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}