"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Props {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

export default function HeroMottoTransition({ frontContent, backContent }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !card.current || !mottoRef.current || !frontRef.current || !backRef.current) return;
    const words = mottoRef.current.querySelectorAll(".motto-word");

    gsap.set(backRef.current, { autoAlpha: 0 });
    gsap.set(frontRef.current, { autoAlpha: 1 });
    gsap.set(words, { y: 40, autoAlpha: 0 });

    // Use CSS sticky instead of GSAP pin for zero layout shifting
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom", // animates through the 250vh of the container
        scrub: 0.8,
      },
    });

    // 1. Initial contraction & front content fade out
    tl.to(card.current, {
      scale: 0.88,
      borderRadius: "3.5rem",
      duration: 0.3,
      ease: "power2.inOut",
    }, 0)
    .to(frontRef.current, {
      autoAlpha: 0,
      y: -25,
      duration: 0.25,
      ease: "power2.in",
    }, 0)

    // 2. Background color morph & back content fade in
    .to(card.current, {
      backgroundColor: "#FF9B7A", 
      color: "#3E2A24", 
      duration: 0.35,
      ease: "none",
    }, 0.2)
    .to(backRef.current, {
      autoAlpha: 1,
      duration: 0.25,
      ease: "power2.out",
    }, 0.22)

    // 3. Staggered motto words reveal
    .to(words, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.05,
      duration: 0.4,
      ease: "power3.out",
    }, 0.3)

    // 4. Smooth expansion back to full card presence
    .to(card.current, {
      scale: 1,
      borderRadius: "2.5rem",
      duration: 0.35,
      ease: "power2.out",
    }, 0.65);

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[220vh] z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12 md:py-20">
        <div 
          ref={card} 
          className="relative w-[90vw] md:w-[80vw] max-w-5xl min-h-[460px] md:min-h-[520px] overflow-hidden rounded-[2.5rem] shadow-2xl flex items-center justify-center bg-[#3E2A24] text-[#FAF0E6] will-change-transform transition-shadow duration-300"
        >
          <div ref={frontRef} className="absolute inset-0 flex items-center justify-center p-6 text-center">
            {frontContent}
          </div>
          <div ref={backRef} className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div ref={mottoRef} className="w-full h-full flex items-center justify-center">
              {backContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
