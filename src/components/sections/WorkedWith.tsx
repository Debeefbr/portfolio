"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioData } from "@/data";

export default function WorkedWith() {
  const container = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP({ scope: container });



  useGSAP(() => {
    if (!previewRef.current || !container.current) return;

    // Set initial state
    gsap.set(previewRef.current, { 
      xPercent: -50, 
      yPercent: -50, 
      opacity: 0,
      visibility: "hidden",
      scale: 0.8,
      position: "absolute",
      top: 0,
      left: 0,
    });

    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.4, ease: "power3" });

    // Track mouse over the entire container independently
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      const rect = container.current.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    const containerEl = container.current;
    containerEl.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      containerEl.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: container });

  const handleMouseEnter = contextSafe((e: React.MouseEvent, imgPath: string) => {
    if (imageRef.current) {
      imageRef.current.src = imgPath;
    }
    
    if (!previewRef.current) return;
    
    gsap.to(previewRef.current, {
      opacity: 1,
      visibility: "visible",
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto" // Only overwrites opacity/scale/visibility, doesn't kill x/y quickTo
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!previewRef.current) return;
    
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(previewRef.current, { visibility: "hidden" });
      }
    });
  });


  return (
    <section ref={container} className="relative z-[60] w-full bg-[var(--color-charcoal)] py-24 text-[var(--color-cream)] md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <header className="flex flex-col gap-8 border-b border-[var(--color-cream)]/15 pb-7 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-5xl font-black uppercase leading-none tracking-tighter md:text-7xl">
            Worked <span className="text-outline text-[var(--color-cream)]">With</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-cream)]/60 md:pb-1">
            Professional Experience
          </p>
        </header>

        <div className="mt-12 border-t border-[var(--color-cream)]/10">
          <div className="grid grid-cols-1 gap-2 border-b border-[var(--color-cream)]/10 px-2 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-cream)]/40 md:grid-cols-[minmax(0,1fr)_260px] md:gap-10 md:px-12">
            <span>Partner / Role</span>
            <span>Sector / Period</span>
          </div>

          <ul>
            {portfolioData.experience.map((experience) => (
              <li
                key={experience.id}
                onMouseEnter={(e) => handleMouseEnter(e, experience.previewImage)}
                onMouseLeave={handleMouseLeave}
                className="experience-item group grid cursor-none grid-cols-1 gap-4 border-b border-[var(--color-cream)]/10 px-2 py-7 transition-colors duration-300 hover:bg-[var(--color-coral)] md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-10 md:px-12 md:py-9"
              >
                <div>
                  <h3 className="font-heading text-4xl font-black uppercase leading-[0.9] tracking-tighter text-[var(--color-cream)] transition-colors duration-300 group-hover:text-[var(--color-charcoal)] md:text-6xl lg:text-7xl">
                    {experience.company}
                  </h3>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-cream)]/80 transition-colors duration-300 group-hover:text-[var(--color-charcoal)]/80">
                    {experience.role}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-cream)]/80 transition-colors duration-300 group-hover:text-[var(--color-charcoal)] md:block md:space-y-3">
                  <p className="opacity-90">{experience.sector}</p>
                  <p className="text-right opacity-80 transition-colors duration-300 group-hover:text-[var(--color-charcoal)] md:text-left">{experience.period}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preview Container - Absolute positioning for proper bounds tracking */}
      <div 
        ref={previewRef} 
        className="absolute left-0 top-0 z-[100] pointer-events-none w-64 md:w-80 overflow-hidden rounded-2xl border border-[var(--color-cream)]/30 bg-[var(--color-charcoal)] p-2 shadow-2xl"
      >
        <img 
          ref={imageRef} 
          src={portfolioData.experience[0]?.previewImage || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} 
          alt="Work preview" 
          className="w-full h-auto rounded-xl block"
        />
      </div>
    </section>
  );
}
