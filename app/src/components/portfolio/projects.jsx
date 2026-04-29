import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { projects } from "../../mock";
import { ArrowUpRight, X } from "lucide-react";
import { toast } from "sonner";

// ── Lightbox via Portal ───────────────────────────────────────────────────────
function Lightbox({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(20,20,20,0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#F5F1E8",
          color: "#141414",
          border: "none",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          zIndex: 10000,
        }}
      >
        <X size={18} />
      </button>

      {/* Content — click doesn't bubble to backdrop */}
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "90vw", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.cover}
          alt={project.title}
          style={{
            objectFit: "contain",
            maxWidth: "90vw",
            maxHeight: "80vh",
            borderRadius: 4,
            animation: "lbIn 0.35s cubic-bezier(.2,.7,.2,1) both",
          }}
        />

        {/* Caption */}
        <div style={{ marginTop: "1rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", padding: "0 4px" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)", margin: 0 }}>
              {project.index} / {project.category} — {project.year}
            </p>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#F5F1E8", marginTop: 6, marginBottom: 0 }}>
              {project.title}
            </h3>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", marginTop: 4 }}>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: "rgba(245,241,232,0.1)",
                  color: "rgba(245,241,232,0.65)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lbIn {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body   // ← portal target: escapes ALL parent stacking contexts
  );
}

// ── CategoryFilter ────────────────────────────────────────────────────────────
function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const isActive = active === c;
        const cls = isActive
          ? "bg-[#141414] text-[#F5F1E8] border-[#141414]"
          : "bg-transparent text-[#141414]/70 border-[#141414]/20 hover:border-[#141414]";
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`font-mono-ui text-[10px] tracking-[0.22em] uppercase px-4 py-2 rounded-full border transition-colors ${cls}`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

// ── ProjectCover ──────────────────────────────────────────────────────────────
function ProjectCover({ project }) {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-sm"
      style={{ backgroundColor: project.color }}
    >
      <img
        src={project.cover}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 left-4 flex gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="font-mono-ui text-[10px] tracking-[0.18em] uppercase bg-[#F5F1E8]/90 text-[#141414] px-2.5 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
      {/* Zoom hint icon */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={16} />
      </div>
      {/* Zoom cursor overlay */}
      <div className="absolute inset-0 cursor-zoom-in" />
    </div>
  );
}

// ── ProjectMeta ───────────────────────────────────────────────────────────────
function ProjectMeta({ project }) {
  return (
    <div className="mt-5 flex items-start justify-between gap-6">
      <div>
        <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60">
          {project.index} / {project.category} — {project.year}
        </div>
        <h3 className="mt-2 font-display text-2xl md:text-[28px] leading-tight tracking-[-0.01em] text-[#141414] group-hover:text-[#B8593C] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-[#141414]/70 max-w-[46ch]">
          {project.summary}
        </p>
      </div>
      <span className="shrink-0 font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/50 whitespace-nowrap mt-3">
        {project.client}
      </span>
    </div>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ project, layoutIndex, onOpen }) {
  const large = layoutIndex % 5 === 0 || layoutIndex % 5 === 3;
  const span  = large ? "md:col-span-7" : "md:col-span-5";
  const offset = layoutIndex % 5 === 3 ? "md:col-start-6" : "";

  return (
    <article className={`group relative ${span} ${offset}`}>
      {/* Image click → lightbox */}
      <div onClick={() => onOpen(project)} className="cursor-zoom-in">
        <ProjectCover project={project} />
      </div>
      <ProjectMeta project={project} />
    </article>
  );
}

// ── Page section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [filter,   setFilter]   = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const openArchive = () =>
    toast("Full archive launching soon", { description: "36 more projects in the vault." });

  return (
    <>
      {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}

      <section id="work" className="py-24 md:py-32 border-t border-[#141414]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-5">
                <span className="w-8 h-px bg-[#141414]/40" />
                Selected Work — W · 01
              </div>
              <h2 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[1] tracking-[-0.015em]">
                A curated set of{" "}
                <em className="italic text-[#B8593C] font-normal">recent projects</em>.
              </h2>
            </div>
            <CategoryFilter categories={categories} active={filter} onChange={setFilter} />
          </div>

          <div className="grid md:grid-cols-12 gap-8 md:gap-10">
            {shown.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                layoutIndex={i}
                onOpen={setLightbox}
              />
            ))}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={openArchive}
              className="inline-flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase border-b border-[#141414] pb-1 hover:text-[#B8593C] hover:border-[#B8593C] transition-colors"
            >
              View full archive
            </button>
          </div>
        </div>
      </section>
    </>
  );
}