"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { skills } from "@/data/skills";

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Staggered reveal for skill cards
    gsap.fromTo(".skill-card", {
      y: 50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="max-w-[90rem] mx-auto px-6 md:px-12 mb-24 md:mb-36 pt-16 md:pt-24 relative z-20 bg-[var(--color-cream)]"
    >
      <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-10 text-black">
        SKILLS & <span className="text-[var(--color-sage)]">TOOLS</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="skill-card opacity-0 flex flex-col items-center justify-center text-center bg-white border-[3px] border-black rounded-[1.5rem] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000]"
          >
            {/* Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
              <img 
                src={skill.icon} 
                alt={`${skill.name} logo`} 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-heading font-black text-black mb-2">
              {skill.name}
            </h3>
            
            {/* Subtitle */}
            <p className="text-sm md:text-base font-mono font-bold text-[var(--color-charcoal)]/60">
              {skill.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
