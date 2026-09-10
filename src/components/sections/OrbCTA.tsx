"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticLink from "@/components/ui/MagneticLink";
import { TransitionLink } from "@/components/ui/TransitionLink";

export default function OrbCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    const content = contentRef.current;
    if (!section || !orb || !content) return;

    gsap.from(orb, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(content.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  const onMove = useCallback((e: React.MouseEvent) => {
    const orb = orbRef.current;
    const section = sectionRef.current;
    if (!orb || !section) return;

    const sectionRect = section.getBoundingClientRect();
    const orbRect = orb.getBoundingClientRect();
    const cx = orbRect.left + orbRect.width / 2 - sectionRect.left;
    const cy = orbRect.top + orbRect.height / 2 - sectionRect.top;
    const dx = e.clientX - sectionRect.left - cx;
    const dy = e.clientY - sectionRect.top - cy;

    gsap.to(orb, {
      x: dx * 0.12,
      y: dy * 0.12,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const onLeave = useCallback(() => {
    const orb = orbRef.current;
    if (!orb) return;
    gsap.to(orb, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[var(--color-cream)] z-10 px-6 overflow-hidden"
    >
      {/* Decorative ring */}
      <div
        className="absolute rounded-full border border-[var(--color-coral)]/20 pointer-events-none"
        style={{ width: "min(90vw, 520px)", height: "min(90vw, 520px)" }}
      />

      {/* Text content */}
      <div ref={contentRef} className="relative z-10 text-center">
        <h2 className="font-heading font-black uppercase leading-[0.95] text-[var(--color-charcoal)] text-[clamp(2.5rem,7vw,5.5rem)]">
          The Analyst
          <br />
          Behind the <span className="text-outline text-[var(--color-coral)]">Data.</span>
        </h2>

        <p className="mt-6 text-[var(--color-chocolate)]/70 italic font-light text-lg md:text-xl max-w-md mx-auto">
          Clear narratives. Deep insights. Logic that drives decisions.
        </p>
      </div>

      {/* Orb */}
      <div
        ref={orbRef}
        className="relative mt-14 md:mt-16 rounded-full flex items-center justify-center will-change-transform"
        style={{
          width: "clamp(260px, 40vw, 360px)",
          height: "clamp(260px, 40vw, 360px)",
          background: "radial-gradient(circle at 40% 35%, var(--color-coral) 0%, var(--color-peach) 55%, var(--color-violet) 100%)",
          boxShadow: "inset 0 -20px 40px rgba(62,42,36,0.15), 0 24px 60px rgba(62,42,36,0.22)",
        }}
      >
        {/* Shine highlight */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "35%",
            height: "35%",
            top: "12%",
            left: "20%",
            background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
            filter: "blur(3px)",
          }}
        />

        {/* CTA text on balloon */}
        <MagneticLink strength={0.25} className="max-w-[70%] z-10">
          <TransitionLink href="/about" data-cursor="OPEN">
            <span className="block text-center text-[var(--color-cream)] font-heading font-semibold text-base md:text-lg leading-snug select-none pointer-events-auto">
              Want to know more about me?
            </span>
          </TransitionLink>
        </MagneticLink>
      </div>
    </section>
  );
}