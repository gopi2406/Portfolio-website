"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE = [
  {
    title: "UI/UX Design — Adobe XD From Scratch",
    issuer: "Udemy",
    instructor: "Mehdi Baoueb",
    hours: "2.5 hrs",
    date: "May 2021",
    tags: ["UI/UX", "Adobe XD"],
    image: "/1.jpg",
  },
  {
    title: "Ultimate Graphic Design — Photoshop & Illustrator",
    issuer: "Udemy",
    instructor: "Rudolph Pieterse",
    hours: "6.5 hrs",
    date: "May 2021",
    tags: ["Graphic Design", "Photoshop"],
    image: "/2.jpg",
  },
  {
    title: "Professional UX/UI Designer — Profitable Profession",
    issuer: "Udemy",
    instructor: "Andrew Borysenko",
    hours: "1 hr",
    date: "June 2021",
    tags: ["UX/UI", "Career"],
    image: "/3.jpg",
  },
  {
    title: "Graphic Design Projects For Beginners",
    issuer: "Udemy",
    instructor: "Anthony Isaac",
    hours: "2.5 hrs",
    date: "June 2021",
    tags: ["Graphic Design"],
    image: "/4.jpg",
  },
  {
    title: "Master In Photoshop Tools — Beast Master",
    issuer: "Udemy",
    instructor: "Prince Garg",
    hours: "10 hrs",
    date: "June 2021",
    tags: ["Photoshop", "Advanced"],
    image: "/5.jpg",
  },
];

// Triplicate so we always have left + center + right neighbors
const OFFSET = BASE.length; // start in the middle copy

// 3 visible slots
const SLOTS = [
  { x: 17, top: 80, w: 250 },  // left
  { x: 50, top: 0,  w: 500 },  // center
  { x: 83, top: 80, w: 250 },  // right
];
const CENTER_SLOT = 1;
const VISIBLE     = 3;
const INTERVAL_MS = 2000;

export default function Credentials() {
  // activeIdx into CERTS array, starts in middle copy
  const [activeIdx, setActiveIdx] = useState(0);
  // const [quoteVisible, setQuoteVisible] = useState(true);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Advance by delta, then silently re-center into middle copy if near edges
  const advance = useCallback((delta, currentIdx) => {
    return (currentIdx + delta + BASE.length) % BASE.length;
  }, []);

  const goTo = useCallback((delta) => {
    setActiveIdx((prev) => (prev + delta + BASE.length) % BASE.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % BASE.length);
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    const handleResume = () => {
      startTimer();

      // 🔥 force UI update (IMPORTANT)
      setActiveIdx((prev) => (prev + 1) % BASE.length);
    };

    document.addEventListener("visibilitychange", handleResume);
    window.addEventListener("focus", handleResume);

    return () => {
      document.removeEventListener("visibilitychange", handleResume);
      window.removeEventListener("focus", handleResume);
    };
  }, [startTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        // restart timer
        startTimer();

        // 🔥 force re-render (MOST IMPORTANT)
        setActiveIdx((prev) => (prev + 1) % BASE.length);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startTimer]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 🔥 section visible → restart slider
          startTimer();

          // 🔥 force re-render
          setActiveIdx((prev) => (prev + 1) % BASE.length);
        } else {
          // optional: jab bahar ho to stop bhi kar sakti ho
          stopTimer();
        }
      },
      { threshold: 0.6 } // 60% visible hone par trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [startTimer, stopTimer]);


  useEffect(() => {
    const section = document.getElementById("credentials");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 🔥 section visible → restart slider
          startTimer();
          setActiveIdx((prev) => (prev + 1) % BASE.length);
        } else {
          // optional: stop when not visible
          stopTimer();
        }
      },
      { threshold: 0.3 } // 30% visible
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [startTimer, stopTimer]);

  // slot index for a given cert index in CERTS array
  const getSlotIdx = (ci) => {
    const offset  = ci - activeIdx;
    const slotIdx = CENTER_SLOT + offset;
    if (slotIdx < 0 || slotIdx >= VISIBLE) return null;
    return slotIdx;
  };

  const hiddenPos = (ci) => {
    const offset = ci - activeIdx;

    return offset > 0
      ? { x: 100, top: 80, w: 200 } // just outside right
      : { x: 0, top: 80, w: 200 };  // just outside left
  };

  // Active cert data (mapped back to BASE)
  const active = BASE[activeIdx % BASE.length];

  // Only render a window of 7 items around activeIdx to avoid heavy DOM
  const window_start = activeIdx - 2;
  const window_end   = activeIdx + 2;
  const visibleCerts = BASE.map((c, i) => ({ ...c, _i: i }));

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="py-24 md:py-32 border-t border-[#141414]/10"
      onMouseEnter={() => stopTimer()}
      onMouseLeave={() => startTimer()}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-5">
              <span className="w-8 h-px bg-[#141414]/40" />
              Credentials — C · 05
            </div>
            <h2 className="font-display text-[clamp(2rem,5.4vw,3.8rem)] leading-[1.02] tracking-[-0.015em]">
              Certified in craft,{" "}
              <em className="italic text-[#B8593C] font-normal">always learning.</em>
            </h2>
          </div>

        </div>

        {/* Arc Slider */}
        <div className="relative w-full" style={{ height: 420 }}>

          {/* Left arrow */}
          <button
            onClick={() => { stopTimer(); goTo(-1); startTimer(); }}
            className="absolute z-30 w-10 h-10 rounded-full border border-[#141414]/20 grid place-items-center hover:border-[#141414] hover:bg-[#141414]/5 transition-colors"
            style={{ left: 0, top: "35%" }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => { stopTimer(); goTo(1); startTimer(); }}
            className="absolute z-30 w-10 h-10 rounded-full border border-[#141414]/20 grid place-items-center hover:border-[#141414] hover:bg-[#141414]/5 transition-colors"
            style={{ right: 0, top: "35%" }}
          >
            <ChevronRight size={16} />
          </button>

          {/* Cards */}
          {visibleCerts.map((cert) => {
            const ci      = cert._i;
            const slotIdx = getSlotIdx(ci);
            const isVis   = slotIdx !== null;
            const slot    = isVis ? SLOTS[slotIdx] : hiddenPos(ci);
            const isCenter = slotIdx === CENTER_SLOT;

            return (
              <div
                key={ci}
                onClick={() => { stopTimer(); goTo(ci - activeIdx); startTimer(); }}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{
                  left:          `${slot.x}%`,
                  top:           `${slot.top}px`,
                  width:         `${slot.w}px`,
                  transform:     "translateX(-50%)",
                  opacity:       isVis ? 1 : 0,
                  pointerEvents: isVis ? "auto" : "none",
                  zIndex:        isCenter ? 10 : isVis ? 4 : 0,
                  transition:    "left 0.6s cubic-bezier(.4,0,.2,1), top 0.6s cubic-bezier(.4,0,.2,1), width 0.6s cubic-bezier(.4,0,.2,1), opacity 0.4s ease",
                }}
              >
                <div
                  className="w-full overflow-hidden"
                  style={{
                    borderRadius: 8,
                    aspectRatio: "4/3",
                    boxShadow: isCenter
                      ? "0 28px 80px rgba(20,20,20,0.22), 0 0 0 3px border-none"
                      : "0 8px 24px rgba(20,20,20,0.10)",

                    transition: "box-shadow 0.5s ease, border 0.5s ease",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: isCenter ? "none" : "grayscale(50%) brightness(0.72)",
                      transition: "filter 0.5s ease",
                    }}
                  />
                </div>

                <div
                  className="mt-3 text-center"
                  style={{
                    opacity:       isCenter ? 1 : 0,
                    transition:    "opacity 0.4s ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/*<span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-[#141414]/45">*/}
                  {/*  {cert.issuer} · {cert.date}*/}
                  {/*</span>*/}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Info */}
        <div
          className="mt-6 text-center"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}
        >
          <h3 className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-tight tracking-[-0.01em] text-[#141414] max-w-[50ch] mx-auto">
            {active.title}
          </h3>
          {/*<p className="mt-2 font-mono-ui text-[10px] tracking-[0.2em] uppercase text-[#141414]/45">*/}
          {/*  {active.instructor} · {active.hours}*/}
          {/*</p>*/}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            {active.tags.map((t) => (
              <span
                key={t}
                className="font-mono-ui text-[10px] tracking-[0.18em] uppercase border border-[#141414]/15 text-[#141414]/50 px-3 py-1.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dots — based on BASE length */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {BASE.map((_, i) => {
            const isActive = (activeIdx % BASE.length) === i;
            return (
              <button
                key={i}
                onClick={() => {
                  stopTimer();
                  const delta = i - (activeIdx % BASE.length);
                  goTo(delta);
                  startTimer();
                }}
                className="transition-all duration-300"
                style={{
                  width:        isActive ? 24 : 6,
                  height:       6,
                  borderRadius: 999,
                  background:   isActive ? "#B8593C" : "rgba(20,20,20,0.15)",
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}