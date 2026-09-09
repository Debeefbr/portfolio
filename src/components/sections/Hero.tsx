"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import DraggableHeroText from "@/components/ui/DraggableHeroText";
import HeroMottoTransition from "@/components/ui/HeroMottoTransition";
import MagneticLink from "@/components/ui/MagneticLink";
import { TransitionLink } from "@/components/ui/TransitionLink";

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
        {/* Subtitle top */}
        <span className="hero-subtitle-top text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-coral)] mb-4">Data Analyst Portfolio</span>

        {/* Hero name with solid + outline */}
        <div className="relative z-10 w-full text-center">
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
        <p className="hero-subtitle-bottom mt-6 text-lg md:text-xl font-light italic text-[var(--color-charcoal)] opacity-70 max-w-xl text-center">
          I turn complex data into clear decisions.
        </p>

        {/* CTA Button */}
        <div className="hero-cta mt-8" data-cursor="OPEN">
          <TransitionLink href="/about">
            <MagneticLink>
              <span className="inline-flex items-center gap-3 rounded-full bg-[var(--color-charcoal)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[var(--color-cream)] shadow-lg transition-colors hover:bg-[var(--color-coral)] hover:text-[var(--color-charcoal)]">Meet the analyst <span>↗</span></span>
            </MagneticLink>
          </TransitionLink>
        </div>
      </section>

      {/* 3D Flip Card — Hero → Motto */}
      <HeroMottoTransition
        frontContent={
          <div className="text-center px-8">
            <p className="text-xs uppercase tracking-[0.3em] opacity-50 mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.85] uppercase">
              Deby<br />Febrianty
            </h2>
          </div>
        }
        backContent={
          <div className="text-center px-8 md:px-16 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] mb-6 opacity-60">My approach</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-snug">
              {["I", "turn", "complex", "data", "into", "clear", "decisions."].map((word) => (
                <span key={word} className="motto-word inline-block mr-[0.22em]">{word}</span>
              ))}
            </h2>
          </div>
        }
      />
    </>
  );
}
