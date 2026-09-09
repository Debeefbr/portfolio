"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioData } from "@/data";
import TiltCard from "@/components/ui/TiltCard";

const cardColors = ["#E0C340", "#A3C9A8", "#A67DBA"];

export default function FeaturedWork() {
  const container = useRef<HTMLDivElement>(null);
  const cardsWrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!container.current || !cardsWrap.current) return;
    const cardEls = cards.current.filter(Boolean) as HTMLDivElement[];
    if (cardEls.length === 0) return;

    cardEls.forEach((card, i) => {
      if (i > 0) {
        gsap.set(card, { yPercent: 120, scale: 0.95 });
      }
    });

    // Use CSS sticky instead of GSAP pin for zero layout shifting
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom", // animates over the full 250vh height
        scrub: 1,
      },
    });

    cardEls.forEach((card, i) => {
      if (i > 0) {
        const prevCards = cardEls.slice(0, i);
        tl.addLabel(`card${i}`, i * 1);

        tl.to(card, {
          yPercent: 0,
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
        }, `card${i}`);

        prevCards.forEach((prev, j) => {
          tl.to(prev, {
            scale: 1 - ((i - j) * 0.05),
            yPercent: -((i - j) * 5),
            duration: 1,
            ease: "power2.inOut",
          }, `card${i}`);
        });
      }
    });
  }, { scope: container });

  const featured = portfolioData.experience.slice(0, 3);

  return (
    <section ref={container} className="relative w-full h-[300vh] bg-[var(--background)] z-30">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          {/* Section title */}
          <div className="mb-12 md:mb-16 shrink-0 z-40">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#FF9B7A] block mb-3">
              Featured
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tighter leading-[0.85]">
              <span className="text-[#3E2A24]">Featured</span>
              <br />
              <span className="text-outline text-[#FF9B7A]">Work</span>
            </h2>
          </div>

          {/* Stacking cards container */}
          <div ref={cardsWrap} className="relative flex-1 w-full">
            {featured.map((exp, i) => (
              <div
                key={exp.id}
                ref={(el) => { cards.current[i] = el; }}
                className="absolute top-0 left-0 w-full rounded-[2.5rem] p-8 md:p-12 h-full min-h-[400px] flex flex-col md:flex-row items-start justify-between gap-10 shadow-2xl will-change-transform origin-top"
                style={{
                  backgroundColor: cardColors[i % cardColors.length],
                  zIndex: i + 1 
                }}
              >
                <TiltCard className="w-full h-full flex flex-col md:flex-row items-start justify-between gap-10">
                  <div className="md:w-1/2 flex flex-col h-full">
                    <span className="inline-flex w-12 h-12 rounded-full bg-[#3E2A24] text-[#FAF0E6] items-center justify-center font-bold text-sm mb-6 md:mb-8 shrink-0">
                      0{i + 1}
                    </span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[0.9] mb-4 text-[#3E2A24]">
                      {exp.role}
                    </h3>
                    <p className="text-lg font-medium opacity-70 mb-4 text-[#3E2A24]">{exp.company}</p>
                    <p className="text-base md:text-xl font-light leading-relaxed opacity-85 max-w-xl text-[#3E2A24] line-clamp-3 md:line-clamp-none">
                      {exp.description}
                    </p>

                    <div className="mt-auto pt-6 flex flex-wrap items-center gap-4 text-[#3E2A24]">
                      <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold opacity-60">
                        Data &bull; Analysis &bull; Operations
                      </span>
                      <span className="text-xs opacity-40 hidden md:inline">—</span>
                      <span className="text-xs md:text-sm opacity-80 font-medium">{exp.period}</span>
                    </div>
                  </div>

                  <div className="md:w-1/2 h-full flex items-center justify-end w-full mt-6 md:mt-0">
                    <div className="w-full h-[200px] md:h-full max-h-[360px] aspect-[4/3] rounded-2xl bg-[#3E2A24]/10 flex items-center justify-center text-[#3E2A24]/30 border border-[#3E2A24]/10">
                      <span className="text-xl md:text-2xl font-bold uppercase tracking-widest text-center px-4">Project Mockup</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="absolute bottom-6 left-0 w-full text-center z-40 hidden md:block">
          <TransitionLink href="/work" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-[#3E2A24] pb-1 hover:border-[#FF9B7A] hover:text-[#FF9B7A] transition-colors text-[#3E2A24]">
            View all work <span className="text-[14px]">→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
