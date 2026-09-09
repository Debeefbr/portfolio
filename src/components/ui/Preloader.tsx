"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (container.current) {
          container.current.style.display = "none";
        }
      }
    });

    // 1. Animate counter
    tl.to({ value: 0 }, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].value));
      }
    });

    // 2. Slide up to reveal website
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.2
    });

  }, { scope: container });

  // Prevent scrolling while preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 3400); // 2s (count) + 0.2s (pause) + 1.2s (slide up)
    
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[100] bg-[var(--color-charcoal)] text-[var(--color-cream)] flex items-end justify-end p-8 md:p-16"
    >
      <div 
        className="text-[6rem] md:text-[12rem] font-bold tracking-tighter leading-none"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {progress}%
      </div>
    </div>
  );
}
