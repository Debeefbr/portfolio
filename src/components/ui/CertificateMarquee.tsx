"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { certificateImages } from "@/data";

export default function CertificateMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Create a continuous infinite marquee tween
    // We animate to -50% because we duplicated the items. Once it hits -50%, it seamlessly jumps back to 0.
    const marqueeTween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 30, // Base speed of the marquee
      ease: "none",
    });

    // 2. Adjust timeScale based on scroll direction using ScrollTrigger
    ScrollTrigger.create({
      trigger: document.body, // Watch the entire scroll
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // self.direction is 1 (down) or -1 (up)
        // Adjust the timeScale to change direction
        // When direction is 1 (scroll down), timeScale is 1 (right to left)
        // When direction is -1 (scroll up), timeScale is -1 (left to right)
        
        // We can also add a slight speed boost based on velocity (self.getVelocity())
        const velocity = Math.abs(self.getVelocity() / 500); // normalized
        const speedBoost = Math.max(1, 1 + velocity);
        
        gsap.to(marqueeTween, {
          timeScale: self.direction * speedBoost,
          duration: 0.5,
          overwrite: true
        });
      }
    });
    
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[var(--color-sage)] py-16 md:py-24 overflow-hidden relative z-20">
      
      {/* Container for the marquee track */}
      <div 
        ref={marqueeRef}
        className="flex w-max items-center gap-8 md:gap-16 px-4"
        style={{ willChange: "transform" }}
      >
        {/* We map the certificates twice to create a seamless loop effect */}
        {[...certificateImages, ...certificateImages].map((cert, i) => (
          <div 
            key={i} 
            className="relative h-48 md:h-72 w-auto aspect-[1.4] shrink-0 rounded-[1rem] overflow-hidden shadow-xl border-4 border-[var(--color-cream)]/30"
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              sizes="(max-width: 768px) 300px, 500px"
              className="object-contain bg-white" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
