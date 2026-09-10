"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function SequentialTextCard() {
  const container = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !card.current || !text1Ref.current || !text2Ref.current || !text3Ref.current) return;

    // Initial states
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { autoAlpha: 0, y: 50 });
    gsap.set(card.current, {
      scale: 0.9,
      borderRadius: "3rem",
      transformPerspective: 1500,
      rotationX: 0
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // 1. 0% - 15%: Card expands and Text 3 (ABOUT) fades in
    tl.to(card.current, {
      scale: 1,
      borderRadius: "2rem",
      duration: 0.15,
      ease: "power2.out"
    }, 0)
      .to(text3Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.1,
        ease: "power2.out"
      }, 0.05)

      // 2. 25% - 40%: Text 3 (ABOUT) fades out, Text 2 (HEADLINE) fades in
      .to(text3Ref.current, {
        autoAlpha: 0,
        y: -50,
        duration: 0.1,
        ease: "power2.in"
      }, 0.25)
      .to(text2Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.1,
        ease: "power2.out"
      }, 0.35)

      // 3. 50% - 65%: Text 2 (HEADLINE) fades out, Text 1 (MOTTO) fades in
      .to(text2Ref.current, {
        autoAlpha: 0,
        y: -50,
        duration: 0.1,
        ease: "power2.in"
      }, 0.50)
      .to(text1Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.1,
        ease: "power2.out"
      }, 0.60)

      // 4. 85% - 100%: The "throw backward" exit animation
      .to(card.current, {
        scale: 0.8,
        rotationX: 15,
        autoAlpha: 0,
        duration: 0.15,
        ease: "power2.inOut"
      }, 0.85);

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[400vh] z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12 md:py-20 px-6">
        <div
          ref={card}
          className="relative w-full max-w-6xl h-[85vh] max-h-[800px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-cream)] will-change-transform flex items-center justify-center shadow-2xl"
          style={{ transformOrigin: "center center" }}
        >
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/assets/Profile/profile-bg.jpeg"
              alt="Deby Febrianty Profile Background"
              fill
              className="object-cover opacity-40 grayscale-[30%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/40" />
          </div>

          {/* Step 1: ABOUT */}
          <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center z-10">
            <p className="text-2xl md:text-4xl lg:text-5xl font-sans font-medium leading-relaxed max-w-4xl">
              Hi There! Deby here. A high-energy math student and data enthusiast, I build clear analytical narratives, always seeking the fun rhythm between solving serious problems and not taking myself too seriously.
            </p>
          </div>

          {/* Step 2: HEADLINE */}
          <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center z-10">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-light italic leading-tight max-w-5xl">
              As a data analyst, I connect the dots in complex data, blending solid logic with creative problem solving.
            </h3>
          </div>

          {/* Step 3: MOTTO */}
          <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[1.1] max-w-4xl">
              Flipping raw data into your next big win.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
