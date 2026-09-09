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
      let vx = 0;
      let vy = 0;
      let lastX = 0;
      let lastY = 0;
      let timestamp = 0;
      let rafId = 0;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        lastX = startX;
        lastY = startY;
        timestamp = performance.now();
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = "50";
        el.style.filter = "drop-shadow(0 8px 16px rgba(0,0,0,0.15))";
        gsap.to(el, { scale: 1.08, rotation: dx * 0.02, duration: 0.2, ease: "power2.out" });
      };

      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const now = performance.now();
        const dt = Math.min(100, now - timestamp);
        vx = (e.clientX - lastX) / dt * 16;
        vy = (e.clientY - lastY) / dt * 16;
        dx = e.clientX - startX;
        dy = e.clientY - startY;
        lastX = e.clientX;
        lastY = e.clientY;
        timestamp = now;

        gsap.set(el, {
          x: dx,
          y: dy,
          rotation: dx * 0.03 + vx * 2,
        });
      };

      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        el.style.zIndex = "";
        el.style.filter = "";

        // Apply velocity inertia
        let inertiaX = vx * 12;
        let inertiaY = vy * 12;
        let rot = dx * 0.03;

        const inertia = () => {
          dx += inertiaX;
          dy += inertiaY;
          inertiaX *= 0.94;
          inertiaY *= 0.94;
          rot += inertiaX * 0.01;
          gsap.set(el, { x: dx, y: dy, rotation: rot });
          if (Math.abs(inertiaX) > 0.5 || Math.abs(inertiaY) > 0.5) {
            rafId = requestAnimationFrame(inertia);
          } else {
            // Spring back to center
            gsap.to(el, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 1.8,
              ease: "elastic.out(1, 0.3)",
            });
          }
        };
        rafId = requestAnimationFrame(inertia);
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
        cancelAnimationFrame(rafId);
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
