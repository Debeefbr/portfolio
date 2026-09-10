"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { dataCompetencies } from "@/data/core";

export default function DataCompetenciesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Staggered reveal for list items
    gsap.fromTo(".competency-row", {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="max-w-[90rem] mx-auto px-6 md:px-12 mb-24 md:mb-36 pt-12 relative z-20"
    >
      <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-12 text-black">
        DATA <span className="text-[var(--color-mustard)]">COMPETENCIES</span>
      </h2>

      <div className="flex flex-col border-t-2 border-black">
        {dataCompetencies.map((item, index) => (
          <div 
            key={item.id} 
            className={`competency-row opacity-0 flex flex-col md:flex-row items-start md:items-center py-8 border-b-2 border-black transition-colors duration-300 hover:bg-[var(--color-peach)]`}
          >
            {/* Box Icon (Left) */}
            <div className="hidden md:flex w-12 h-12 border-2 border-black bg-white items-center justify-center mr-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <span className="font-heading font-bold text-sm">{index + 1}</span>
            </div>
            
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-heading font-black text-black mb-4 md:mb-0 w-full md:w-1/3 pr-8">
              {item.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm md:text-base font-mono font-bold text-[var(--color-charcoal)]/70 w-full md:w-2/3 md:pl-8 md:border-l-2 md:border-black/10">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
