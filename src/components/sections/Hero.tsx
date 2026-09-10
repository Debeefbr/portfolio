"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import DraggableHeroText from "@/components/ui/DraggableHeroText";
import SequentialTextCard from "@/components/ui/SequentialTextCard";
import MagneticLink from "@/components/ui/MagneticLink";
import { TransitionLink } from "@/components/ui/TransitionLink";
import BubbleCluster from "@/components/ui/BubbleCluster";

export default function Hero() {
  const heroTop = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2.4 });
    
    tl.from(".hero-subtitle-top", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".hero-drag-pill", { opacity: 0, scale: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
      .from(".hero-subtitle-bottom", { opacity: 0, y: 10, duration: 0.8, ease: "power3.out" }, "-=0.2")
      .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3");
  }, { scope: heroTop });

  return (
    <>
      <section ref={heroTop} className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 pt-20">
        {/* Floating logo bubbles */}
        <BubbleCluster />

        {/* Subtitle top */}
        <span className="hero-subtitle-top text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-coral)] mb-4 pointer-events-none">Data Analyst Portfolio</span>

        {/* Hero name with solid + outline */}
        <div className="relative z-10 w-full text-center pointer-events-none">
          <DraggableHeroText
            text="DEBY"
            className="text-[5rem] md:text-[10rem] lg:text-[14rem] text-[var(--color-charcoal)]"
          />
          <DraggableHeroText
            text="FEBRIANTY"
            className="text-[3.5rem] md:text-[7rem] lg:text-[10rem] text-outline text-[var(--color-coral)]"
          />
        </div>

        {/* Subtitle bottom */}
        <p className="hero-subtitle-bottom mt-6 text-lg md:text-xl font-light italic text-[var(--color-charcoal)] opacity-70 max-w-xl text-center pointer-events-none">
          I turn complex data into clear decisions.
        </p>

        {/* CTA Button */}
        <div className="hero-cta mt-8 pointer-events-auto" data-cursor="OPEN">
          <TransitionLink href="/about">
            <MagneticLink>
              <span className="inline-flex items-center gap-3 rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[var(--color-cream)] shadow-lg transition-colors hover:bg-[var(--color-coral)] hover:text-[var(--color-charcoal)]">Meet the analyst <span>↗</span></span>
            </MagneticLink>
          </TransitionLink>
        </div>
      </section>

      {/* 3D Flip Card -> Sequential Text Card */}
      <SequentialTextCard />
    </>
  );
}
