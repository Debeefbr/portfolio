"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioData } from "@/data";
import ImageReveal from "@/components/ui/ImageReveal";
import TextReveal from "@/components/ui/TextReveal";
import TiltCard from "@/components/ui/TiltCard";

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".about-reveal", {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    gsap.from(".skill-tag", {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
      },
    });
  }, { scope: container });

  const skills = ["Excel", "SQL", "Python", "Statistics", "Data Visualization", "SPSS", "Google Sheets", "Problem Solving", "Critical Thinking"];

  return (
    <main ref={container} className="w-full pt-32 pb-24 px-6 md:px-12 relative z-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto mb-20 md:mb-28">
        <span className="about-reveal text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-coral)] block mb-4">
          About
        </span>
        <h1 className="about-reveal text-5xl md:text-7xl lg:text-[8rem] font-heading font-black uppercase tracking-tighter leading-[0.85]">
          The <span className="text-[var(--color-coral)]">Analyst</span>
        </h1>
      </section>

      {/* Bio + Photos */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 mb-24 md:mb-36">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <TextReveal
            text={portfolioData.profile.fullBio}
            className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed opacity-90 mb-10"
          />
          <div className="border-t border-[var(--color-charcoal)]/15 pt-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-coral)] mb-1">Based in</p>
              <p className="text-lg font-medium">Jakarta, Indonesia</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-coral)] mb-1">Education</p>
              <p className="text-lg font-medium">Mathematics, UNJ</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
          <TiltCard className="rounded-[2rem] overflow-hidden aspect-[3/4] shadow-xl">
            <ImageReveal src="/images/profile/profile-1.jpeg" alt="Deby 1" className="w-full h-full" />
          </TiltCard>
          <TiltCard className="rounded-[2rem] overflow-hidden aspect-[3/4] shadow-xl mt-10">
            <ImageReveal src="/images/profile/profile-3.jpeg" alt="Deby 2" className="w-full h-full" />
          </TiltCard>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-7xl mx-auto mb-24 md:mb-36">
        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter mb-10">
          Skills & <span className="text-[var(--color-coral)]">Tools</span>
        </h2>
        <div className="skills-grid flex flex-wrap gap-3 md:gap-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="skill-tag px-5 py-2.5 rounded-full text-sm md:text-base font-medium border border-[var(--color-charcoal)]/15 bg-[var(--color-mushroom)]/40 hover:bg-[var(--color-coral)] hover:text-[var(--color-cream)] hover:border-transparent transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Organizations */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter mb-10">
          Campus <span className="text-[var(--color-violet)]">Organizations</span>
        </h2>
        <div className="space-y-6">
          {portfolioData.organizations.map((org) => (
            <TiltCard
              key={org.id}
              className="border border-[var(--color-charcoal)]/10 rounded-[1.5rem] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--color-cream)] shadow-md"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{org.name}</h3>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-violet)] mt-1">{org.role}</p>
              </div>
              <p className="md:max-w-sm text-base font-light opacity-80 leading-relaxed">{org.description}</p>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
