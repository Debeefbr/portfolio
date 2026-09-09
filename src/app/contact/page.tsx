"use client";

import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticLink from "@/components/ui/MagneticLink";

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    tl.from(".contact-line", {
      y: 120,
      rotateX: -60,
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: "power4.out",
    }).from(
      ".contact-detail",
      { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: container });

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      gsap.to(btn, { x, y, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.3)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <main ref={container} className="w-full min-h-screen flex flex-col justify-between pt-32 pb-10 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex-grow flex flex-col justify-center w-full">
        {/* Big CTA */}
        <div className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-heading font-black uppercase tracking-tighter leading-[0.85]">
            <div className="overflow-hidden">
              <span className="contact-line block">Let&apos;s Work</span>
            </div>
            <div className="overflow-hidden">
              <span className="contact-line block text-[var(--color-coral)]">Together</span>
            </div>
          </h1>
        </div>

        {/* Magnetic button + details */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div className="space-y-8">
            <div className="contact-detail">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-coral)] mb-1">Email</p>
              <a href="mailto:debyfebrianty@gmail.com" className="text-lg md:text-xl font-medium hover:text-[var(--color-coral)] transition-colors">
                debyfebrianty@gmail.com
              </a>
            </div>
            <div className="contact-detail">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-coral)] mb-1">Location</p>
              <p className="text-lg md:text-xl font-medium">Jakarta, Indonesia</p>
            </div>
            <div className="contact-detail flex gap-6">
              <MagneticLink>
                <a href="#" className="text-sm uppercase tracking-[0.15em] border-b border-[var(--color-charcoal)]/30 pb-0.5 hover:border-[var(--color-coral)] hover:text-[var(--color-coral)] transition-colors">
                  LinkedIn
                </a>
              </MagneticLink>
              <MagneticLink>
                <a href="#" className="text-sm uppercase tracking-[0.15em] border-b border-[var(--color-charcoal)]/30 pb-0.5 hover:border-[var(--color-coral)] hover:text-[var(--color-coral)] transition-colors">
                  Instagram
                </a>
              </MagneticLink>
            </div>
          </div>

          <a
            ref={buttonRef}
            href="mailto:debyfebrianty@gmail.com"
            className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-[var(--color-charcoal)] text-[var(--color-cream)] flex items-center justify-center text-lg md:text-xl uppercase font-bold tracking-widest hover:bg-[var(--color-coral)] hover:text-[var(--color-charcoal)] transition-colors duration-300 shadow-xl shrink-0"
          >
            Say Hi
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full mt-20 border-t border-[var(--color-charcoal)]/15 pt-6 flex justify-between items-end text-xs md:text-sm opacity-50">
        <span>© {new Date().getFullYear()} Deby Febrianty</span>
        <span>Data Analyst Portfolio</span>
      </div>
    </main>
  );
}
