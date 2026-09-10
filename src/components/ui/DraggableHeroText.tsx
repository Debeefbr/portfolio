"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  text: string;
  className?: string;
}

export default function DraggableHeroText({ text, className = "" }: Props) {
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const elements = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    const cleanups: Array<() => void> = [];

    elements.forEach((el) => {
      let dragging = false;
      let startX = 0;
      let startY = 0;
      let dx = 0;
      let dy = 0;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = "50";
        gsap.to(el, { scale: 1.05, duration: 0.2, ease: "power2.out" });
      };

      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        dx = e.clientX - startX;
        dy = e.clientY - startY;

        gsap.set(el, {
          x: dx,
          y: dy,
        });
      };

      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        el.style.zIndex = "";

        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.4)",
        });
      };

      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);

      cleanups.push(() => {
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className={`flex flex-wrap justify-center gap-x-[0.3em] select-none ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => { wordsRef.current[i] = el; }}
          data-cursor="DRAG"
          className="inline-block cursor-grab active:cursor-grabbing touch-none font-heading font-black uppercase leading-[0.9] tracking-tighter will-change-transform"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
