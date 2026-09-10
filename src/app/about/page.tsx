"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioData } from "@/data";
import ImageReveal from "@/components/ui/ImageReveal";
import CertificateMarquee from "@/components/ui/CertificateMarquee";
import TiltCard from "@/components/ui/TiltCard";
import FooterContact from "@/components/layout/FooterContact";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);
  const splitSectionRef = useRef<HTMLDivElement>(null);
  const leftTextInnerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);

  const [hoveredAlt, setHoveredAlt] = useState<{ text: string; x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Smooth cursor follow
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hoveredAlt && cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: hoveredAlt.x + 15,
        y: hoveredAlt.y + 15,
        duration: 0.1, // Faster response
        ease: "power2.out",
      });
    }
  }, [hoveredAlt]);

  useGSAP(() => {
    // 1. Text entrance animations
    gsap.from(".about-reveal", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    // 2. Animate left column scroll
    // Since the left column is sticky (100vh), we translate the inner content up based on scroll progress
    // This allows tall text to smoothly scroll into view while the photos are scrolling on the right
    if (splitSectionRef.current && leftTextInnerRef.current && leftTextRef.current) {
      ScrollTrigger.create({
        trigger: splitSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(leftTextInnerRef.current, {
          y: () => {
            const outerHeight = leftTextRef.current?.offsetHeight || window.innerHeight;
            const innerHeight = leftTextInnerRef.current?.offsetHeight || 0;
            const paddingBottom = 120; // Ensure the last text block clears the bottom screen
            return Math.min(0, outerHeight - innerHeight - paddingBottom);
          },
          ease: "none",
        }),
      });
    }

    // 3. Photo entrance animations (removed opacity to prevent transparency bugs)
    gsap.from(".photo-card", {
      y: 100,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: splitSectionRef.current,
        start: "top 70%",
      }
    });

    // 4. Skills tags animations
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

  const photos = [
    { src: "/images/profile/profile-1.jpeg", alt: "Graduation Day", rotate: "-2deg", desc: "The start of my analytical journey, equipped with math and endless curiosity.", className: "w-[85%] self-end" },
    { src: "/images/profile/profile-2.jpeg", alt: "Campus Life", rotate: "1deg", desc: "Finding the rhythm between solving serious problems and enjoying the process.", className: "w-[90%] -mt-10 md:-mt-16 z-10" },
    { src: "/images/profile/profile-3.jpeg", alt: "Behind the Desk", rotate: "3deg", desc: "Wrangling messy spreadsheets into sleek, energetic insights.", className: "w-[80%] self-end -mt-8 md:-mt-20 z-20" },
    { src: "/images/profile/profile-4.jpeg", alt: "Off Duty", rotate: "-1deg", desc: "Hunting down cafe gems and concert tickets.", className: "w-[95%] -mt-10 md:-mt-16 z-30" },
  ];

  return (
    <>
      {/* Custom Cursor Tooltip rendered in Portal to escape transform contexts */}
      {mounted && createPortal(
        <div
          ref={cursorRef}
          className={`fixed top-0 left-0 z-[9999] pointer-events-none bg-[#111111] text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-xs md:text-sm flex items-center gap-2 shadow-2xl transition-opacity duration-200 ${hoveredAlt ? 'opacity-100' : 'opacity-0'}`}
          style={{ willChange: "transform" }}
        >
          <span className="text-[#4ade80] font-bold font-mono tracking-widest">ALT</span>
          <span className="font-mono">"{hoveredAlt?.text}"</span>
        </div>,
        document.body
      )}

      <div ref={container} className="w-full min-h-screen flex flex-col relative z-10 bg-[var(--color-cream)]">
        <main className="flex-1 pb-24">

          {/* SPLIT SECTION: Sticky Left Text + Scrolling Right Photos */}
          <section ref={splitSectionRef} className="max-w-[90rem] mx-auto w-full px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative mb-24 md:mb-32">

            {/* Left Column (Sticky Text) */}
            <div className="lg:w-1/2 relative z-10">
              {/* Native CSS sticky for performance. GSAP handles the Y translation inside this sticky container */}
              <div ref={leftTextRef} className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden pt-32 lg:pt-[15vh] flex flex-col pointer-events-none">

                {/* Inner container to be scrolled by GSAP */}
                <div ref={leftTextInnerRef} className="flex flex-col gap-24 lg:py-16 pointer-events-auto">

                  {/* ABOUT HEADER */}
                  <div className="pb-4">
                    <div className="flex items-center gap-4 mb-4 about-reveal">
                      <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-coral)]">
                        About
                      </span>
                    </div>
                    <h1 className="about-reveal text-6xl md:text-8xl lg:text-[9rem] font-heading font-black uppercase tracking-tighter leading-[0.85] text-[var(--color-charcoal)] pb-2">
                      The <br className="hidden md:block" /><span className="text-[var(--color-coral)]">Analyst</span>
                    </h1>
                  </div>

                  {/* 01 THE DRIVE */}
                  <div className="max-w-2xl">
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="about-reveal text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-coral)]">01 / The Drive</span>
                    </div>

                    <div className="space-y-8">
                      <blockquote className="about-reveal text-2xl md:text-3xl lg:text-4xl font-heading italic font-light leading-snug text-[var(--color-charcoal)] border-l-2 border-[var(--color-coral)] pl-6 md:pl-8">
                        &ldquo;I&apos;ve learned that finding the truth in data isn&apos;t magic — it&apos;s just a beautifully cracked code.&rdquo;
                      </blockquote>
                      <p className="about-reveal text-lg md:text-xl font-light leading-relaxed text-[var(--color-chocolate)]/90">
                        I analyze data for those who crave clarity but refuse to be boring. My approach transforms intimidating mathematical models and messy spreadsheets into sleek, energetic insights where every number actually means something.
                      </p>
                      <p className="about-reveal text-lg md:text-xl font-light leading-relaxed text-[var(--color-chocolate)]/90">
                        I am endlessly curious about the hidden patterns driving business, technology, and human behavior. I am always tinkering with formulas, and I still get a massive, cheerful rush of energy whenever a complex algorithm finally clicks into place perfectly.
                      </p>
                    </div>
                  </div>

                  {/* 02 OFF THE SCREEN */}
                  <div className="max-w-2xl">
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="about-reveal text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-violet)]">02 / Off the Screen</span>
                    </div>

                    <div className="space-y-6">
                      <p className="about-reveal text-lg md:text-xl font-light leading-relaxed text-[var(--color-chocolate)]/90">
                        When I am not wrangling data or building interactive dashboards, you will usually find me cafe hopping around town. There is something about hunting down a spot with the perfect warm aesthetic that scratches the exact same itch as data analysis. It is all about finding the hidden gems in a busy city.
                      </p>
                      <p className="about-reveal text-lg md:text-xl font-light leading-relaxed text-[var(--color-chocolate)]/90">
                        My downtime often involves hunting down concert tickets or screaming the lyrics at a live show. Life outside the screen is energetic yet cozy. And yes, my sugar glider definitely gets far more attention and photo shoots than she probably deserves.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column (Scrolling Photos) */}
            <div className="lg:w-1/2 flex flex-col gap-0 lg:pt-[20vh] lg:pb-[20vh]">
              {photos.map((photo) => (
                <div
                  key={photo.src}
                  className={`photo-card relative rounded-[1.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] cursor-none ${photo.className}`}
                  style={{ rotate: photo.rotate }}
                  onMouseMove={(e) => setHoveredAlt({ text: photo.desc, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredAlt(null)}
                >
                  {/* Image Container */}
                  <div className="w-full relative aspect-[4/5] md:aspect-auto md:h-[600px]">
                    <ImageReveal src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* Certificate Marquee Banner */}
          <CertificateMarquee />

          {/* Skills */}
          <section className="max-w-[90rem] mx-auto px-6 md:px-12 mb-24 md:mb-36 border-t border-[var(--color-charcoal)]/10 pt-16 md:pt-24 relative z-20 bg-[var(--color-cream)]">
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
          <section className="max-w-[90rem] mx-auto px-6 md:px-12 mb-24 relative z-20 bg-[var(--color-cream)]">
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
        <FooterContact />
      </div>
    </>
  );
}