"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[90]">
      <div
        ref={bar}
        className="h-full w-full bg-[var(--color-peach)] origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
