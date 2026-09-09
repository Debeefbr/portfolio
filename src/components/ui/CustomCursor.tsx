"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    const label = labelRef.current;
    if (!dot || !outline || !label) return;

    const xSetDot = gsap.quickSetter(dot, "x", "px");
    const ySetDot = gsap.quickSetter(dot, "y", "px");
    const xSetOutline = gsap.quickSetter(outline, "x", "px");
    const ySetOutline = gsap.quickSetter(outline, "y", "px");
    const xSetLabel = gsap.quickSetter(label, "x", "px");
    const ySetLabel = gsap.quickSetter(label, "y", "px");

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xSetDot(mouseX);
      ySetDot(mouseY);
    };

    const onEnterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const cursorLabel = el.getAttribute("data-cursor");
      gsap.to(outline, { scale: 2.5, borderColor: "transparent", backgroundColor: "rgba(254,160,126,0.15)", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    const onLeaveInteractive = () => {
      gsap.to(outline, { scale: 1, borderColor: "var(--color-peach)", backgroundColor: "transparent", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      outlineX += (mouseX - outlineX) * dt;
      outlineY += (mouseY - outlineY) * dt;
      xSetOutline(outlineX);
      ySetOutline(outlineY);
      xSetLabel(outlineX);
      ySetLabel(outlineY);
    });

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll("a, button, [data-cursor]");
      newInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] text-[10px] font-bold uppercase tracking-widest text-[var(--color-peach)] hidden md:flex items-center justify-center opacity-0"
        style={{ transform: "translate(-50%, -50%) scale(0.5)" }}
      />
    </>
  );
}
