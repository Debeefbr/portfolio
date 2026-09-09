"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioData } from "@/data";
import TiltCard from "@/components/ui/TiltCard";

const cardColors = ["var(--color-mustard)", "var(--color-sage)", "var(--color-violet)"];

export default function SneakPeek() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".sneak-card", {
      y: 80,
      opacity: 0,
      scale: 0.94,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
    });
  }, { scope: container });

  const featured = portfolioData.experience.slice(0, 3);

  return (
    <section ref={container} className="w-full py-24 md:py-40 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-coral)] block mb-3">Selected</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold uppercase tracking-tighter leading-none">Work</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((exp, i) => (
            <TiltCard
              key={exp.id}
              className="sneak-card rounded-[2rem] p-8 md:p-9 min-h-[300px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: cardColors[i] }}
            >
              <div>
                <span className="inline-block w-10 h-10 rounded-full bg-[var(--color-charcoal)] text-[var(--color-cream)] flex items-center justify-center font-bold text-sm mb-6">0{i + 1}</span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">{exp.role}</h3>
                <p className="text-sm font-medium opacity-70">{exp.company}</p>
              </div>
              <p className="text-sm font-light leading-relaxed opacity-80 mt-6 border-t border-[var(--color-charcoal)]/15 pt-5">{exp.description}</p>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/work" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] border-b border-[var(--color-charcoal)] pb-1 hover:border-[var(--color-coral)] hover:text-[var(--color-coral)] transition-colors">
            View all work <span className="text-[10px]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
