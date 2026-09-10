"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { education } from "@/data";

export default function EducationSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Staggered bouncy reveal for education cards
    gsap.from(".edu-card", {
      y: 100,
      opacity: 0,
      rotation: 5,
      stagger: 0.2,
      duration: 1.2,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // Magnetic effect setup
    const cards = document.querySelectorAll(".edu-card");
    cards.forEach((card) => {
      const htmlCard = card as HTMLElement;
      
      const xTo = gsap.quickTo(htmlCard, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(htmlCard, "y", { duration: 0.4, ease: "power3" });
      const rotateTo = gsap.quickTo(htmlCard, "rotate", { duration: 0.4, ease: "power3" });

      htmlCard.addEventListener("mousemove", (e) => {
        const rect = htmlCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Move card slightly towards mouse
        xTo(distanceX * 0.15);
        yTo(distanceY * 0.15);
        rotateTo(distanceX * 0.02);
      });

      htmlCard.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
        rotateTo(0);
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[var(--color-peach)] py-24 md:py-32 px-6 md:px-12 relative z-20 border-t-2 border-black"
    >
      <div className="max-w-[90rem] mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black uppercase tracking-tighter mb-16 text-black">
          Education
        </h2>

        <div className="flex flex-col gap-8 md:gap-12">
          {education.map((edu, i) => (
            <div 
              key={edu.id}
              className="edu-card w-full md:w-[85%] border-4 border-black rounded-[2rem] md:rounded-[4rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
              style={{ 
                backgroundColor: edu.color,
                alignSelf: i % 2 === 0 ? "flex-start" : "flex-end" // Zig-zag pattern
              }}
            >
              {/* Decorative abstract shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border-4 border-black rounded-full opacity-20 pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border-4 border-black rounded-lg rotate-12 opacity-20 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-black mb-2 leading-none">
                    {edu.school}
                  </h3>
                  <p className="text-xl md:text-2xl font-mono font-bold text-black/80">
                    {edu.degree}
                  </p>
                </div>
                
                <div className="text-left md:text-right">
                  <div className="inline-block bg-black text-white font-mono font-bold px-4 py-2 rounded-full text-sm md:text-base mb-2">
                    {edu.period}
                  </div>
                  <p className="text-lg md:text-xl font-bold text-black font-mono">
                    {edu.score}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
