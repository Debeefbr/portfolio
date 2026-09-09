"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ImageReveal({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.fromTo(container.current, { clipPath: "inset(100% 0 0 0)" }, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.2,
      ease: "power4.inOut",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
    gsap.fromTo(image.current, { scale: 1.3 }, {
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 85%" },
    });
  }, { scope: container });

  return (
    <div ref={container} className={`relative overflow-hidden ${className}`}>
      <Image ref={image} src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
