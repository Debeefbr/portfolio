"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CSSProperties, ReactNode } from "react";

export default function TiltCard({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const onMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(el, {
      rotateX: y * -10,
      rotateY: x * 10,
      scale: 1.02,
      perspective: 900,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  const onLeave = contextSafe(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  return (
    <div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave} 
      style={style} 
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
