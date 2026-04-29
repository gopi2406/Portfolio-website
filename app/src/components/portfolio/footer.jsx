import React from "react";
import { profile } from "../../mock";
import { ArrowUpRight } from "lucide-react";

const SITEMAP = [
    { label: "Selected Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
];

function Wordmark() {
    return (
        <div className="border-b border-[#141414]/10 pb-10">
            <a href="#top" className="block group">
                <h3 className="font-display leading-[0.9] tracking-[-0.03em] text-[#141414] text-[22vw] md:text-[16vw]">
                    Gopi <em className="italic text-[#B8593C] font-normal"> P. </em>
                </h3>
            </a>
        </div>
    );
}

function StudioBlock() {
    return (
        <div className="md:col-span-5">
            <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60 mb-4">ABOUT</div>
            <p className="text-[15.5px] leading-[1.65] text-[#141414]/80 max-w-[44ch]">
                Independent designer working with small teams and great people to build meaningful products and brands that deserve to exist.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8593C] animate-pulse" />
            </div>
        </div>
    );
}

function FooterColumn({ title, children, className = "md:col-span-3" }) {
    return (
        <div className={className}>
            <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60 mb-4">
                {title}
            </div>
            {children}
        </div>
    );
}

function SitemapList() {
    return (
        <ul className="space-y-2">
            {SITEMAP.map((item) => (
                <li key={item.label}>
                    <a
                        href={item.href}
                        className="text-[15.5px] text-[#141414]/80 hover:text-[#B8593C] transition-colors"
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function ElsewhereList({ socials, email }) {
    return (
        <>
            <ul className="space-y-2">
                {socials.map((s) => (
                    <li key={s.label}>
                        <a
                            href={s.href}
                            className="inline-flex items-center gap-2 text-[15.5px] text-[#141414]/80 hover:text-[#B8593C] transition-colors"
                        >
                            {s.label}
                            <ArrowUpRight size={14} className="opacity-60" />
                        </a>
                    </li>
                ))}
            </ul>
            <a
                href={`mailto:${email}`}
                className="mt-6 inline-flex items-center gap-2 font-display text-[19px] text-[#141414] underline decoration-[#141414]/30 underline-offset-4 hover:text-[#B8593C] hover:decoration-[#B8593C]"
            >
                {email}
            </a>
        </>
    );
}

function Colophon({ year }) {
    return (
        <div className="border-t border-[#141414]/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/55">
            <span>© {year} Gopi Prajapati — All rights reserved</span>
            <span></span>
            <span></span>
        </div>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-[#141414]/10 bg-[#F5F1E8]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10">
                <Wordmark />

                <div className="grid md:grid-cols-12 gap-10 py-12">
                    <StudioBlock />
                    <FooterColumn title="Sitemap">
                        <SitemapList />
                    </FooterColumn>
                    <FooterColumn title="Elsewhere" className="md:col-span-4">
                        <ElsewhereList socials={profile.socials} email={profile.email} />
                    </FooterColumn>
                </div>

                <Colophon year={year} />
            </div>
        </footer>
    );
}
