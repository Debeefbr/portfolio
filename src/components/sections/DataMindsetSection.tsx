"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { dataMindset } from "@/data/core";

const colors = [
  "var(--color-coral)",
  "var(--color-violet)",
  "var(--color-mustard)",
  "var(--color-sage)"
];

export default function DataMindsetSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Staggered reveal for grid items
    gsap.fromTo(".mindset-item", {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
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
      className="max-w-[90rem] mx-auto px-6 md:px-12 mb-20 md:mb-32 pt-16 md:pt-24 relative z-20"
    >
      <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-12 text-black">
        DATA <span className="text-[var(--color-violet)]">MINDSET</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {dataMindset.map((item, i) => (
          <div key={item.id} className="mindset-item opacity-0 flex flex-col group">
            {/* Number */}
            <div 
              className="text-4xl md:text-5xl font-heading font-black mb-4 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ color: colors[i % colors.length] }}
            >
              {item.id}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-heading font-black text-black mb-3">
              {item.title}
            </h3>
            
            {/* Description */}
            <p className="text-base md:text-lg font-mono font-medium text-[var(--color-charcoal)]/80 max-w-md">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
