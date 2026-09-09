"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioData } from "@/data";
import TiltCard from "@/components/ui/TiltCard";

const expColors = ["var(--color-mustard)", "var(--color-sage)", "var(--color-violet)", "var(--color-teal)", "var(--color-coral)"];
const certColors = ["var(--color-peach)", "var(--color-mushroom)", "var(--color-sage)", "var(--color-mustard)"];

export default function WorkPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".work-card", {
      y: 60,
      opacity: 0,
      scale: 0.94,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".work-grid",
        start: "top 80%",
      },
    });

    gsap.from(".cert-card", {
      y: 50,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cert-grid",
        start: "top 80%",
      },
    });
  }, { scope: container });

  return (
    <main ref={container} className="w-full pt-32 pb-24 px-6 md:px-12 relative z-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto mb-16 md:mb-24">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-coral)] block mb-4">
          Portfolio
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-heading font-black uppercase tracking-tighter leading-[0.85]">
          All <span className="text-[var(--color-coral)]">Work</span>
        </h1>
      </section>

      {/* Experience Cards */}
      <section className="max-w-7xl mx-auto mb-24 md:mb-36">
        <h2 className="text-2xl md:text-4xl font-heading font-bold uppercase tracking-tighter mb-10">
          Experience
        </h2>
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioData.experience.map((exp, i) => (
            <TiltCard
              key={exp.id}
              className="work-card rounded-[2rem] p-8 md:p-10 min-h-[300px] flex flex-col justify-between shadow-lg"
              style={{ backgroundColor: expColors[i % expColors.length] }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="w-11 h-11 rounded-full bg-[var(--color-charcoal)] text-[var(--color-cream)] flex items-center justify-center font-bold text-sm shrink-0">
                  0{i + 1}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] font-bold opacity-60">{exp.period}</span>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
                  {exp.role}
                </h3>
                <p className="text-sm md:text-base font-medium opacity-70 mb-5">{exp.company}</p>
                <p className="text-sm font-light leading-relaxed opacity-85 border-t border-[var(--color-charcoal)]/15 pt-5">
                  {exp.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-heading font-bold uppercase tracking-tighter mb-10">
          Certifications & <span className="text-[var(--color-coral)]">Training</span>
        </h2>
        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portfolioData.certifications.map((cert, i) => (
            <TiltCard
              key={cert.id}
              className="cert-card rounded-[1.5rem] p-6 md:p-7 min-h-[240px] flex flex-col justify-between shadow-md border border-[var(--color-charcoal)]/8"
              style={{ backgroundColor: certColors[i % certColors.length] }}
            >
              <div>
                <span className="text-xs uppercase tracking-[0.15em] font-bold opacity-50 block mb-4">Certificate</span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight leading-snug">{cert.name}</h3>
              </div>
              <div className="border-t border-[var(--color-charcoal)]/12 pt-4 mt-5 space-y-1">
                <p className="text-xs font-medium">{cert.issuer}</p>
                <p className="text-xs opacity-60">{cert.date}</p>
                {cert.score && (
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-widest font-bold bg-[var(--color-charcoal)] text-[var(--color-cream)] px-2.5 py-1 rounded-full">
                    Score: {cert.score}
                  </span>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
