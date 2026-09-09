"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function TextReveal({ text, className }: { text: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    // Fallback if SplitText is a premium plugin and fails, we do a simple manual word split
    const words = container.current.querySelectorAll('.word');
    
    gsap.fromTo(words, 
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        }
      }
    );
  }, { scope: container });

  const manualSplit = text.split(" ").map((word, i) => (
    <span key={i} className="inline-block mr-[0.25em]">
      <span className="word inline-block">{word}</span>
    </span>
  ));

  return (
    <div ref={container} className={className}>
      {manualSplit}
    </div>
  );
}
