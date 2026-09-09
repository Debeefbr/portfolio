"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

// Export a singleton function that ANY component can call to trigger the transition.
let globalTriggerTransition: ((href: string) => void) | null = null;

export const triggerTransition = (href: string) => {
  if (globalTriggerTransition) {
    globalTriggerTransition(href);
  } else {
    window.location.href = href; // fallback
  }
};

export default function Template({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // SVG paths refs
  const tealPath = useRef<SVGPathElement>(null);
  const mustardPath = useRef<SVGPathElement>(null);
  const coralPath = useRef<SVGPathElement>(null);
  const charcoalPath = useRef<SVGPathElement>(null);
  
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const COVER = "M 0 100 L 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z";
    const REVEAL_MID = "M 0 50 L 0 0 Q 50 0 100 0 L 100 50 Q 50 0 0 50 Z";
    const REVEAL_END = "M 0 0 L 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z";
    
    // Ensure window is at top immediately on mount
    window.scrollTo(0, 0);
    
    // Initial states:
    // Teal, Mustard, Coral stay hidden at the bottom.
    gsap.set([tealPath.current, mustardPath.current, coralPath.current], { 
      attr: { d: "M 0 100 L 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z" } 
    });
    
    // Charcoal starts fully covering the screen.
    gsap.set(charcoalPath.current, { attr: { d: COVER } });
    
    // Animate container to fade/slide up slightly
    gsap.fromTo(
      container.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    
    // Animate charcoal to reveal the page
    const tl = gsap.timeline();
    tl.to(charcoalPath.current, {
      attr: { d: REVEAL_MID },
      duration: 0.5,
      ease: "power2.in"
    }).to(charcoalPath.current, {
      attr: { d: REVEAL_END },
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Setup the global trigger for OUT-transition
    globalTriggerTransition = (href: string) => {
      // Allow linking to the same page hash (e.g. #contact) without full page reload animation
      if (href.startsWith("#") || pathname === href) {
         router.push(href);
         return;
      }
      
      const HIDDEN = "M 0 100 L 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z";
      const MID = "M 0 100 L 0 50 Q 50 0 100 50 L 100 100 Q 50 100 0 100 Z";
      
      const outTl = gsap.timeline({
        onComplete: () => {
          router.push(href);
        }
      });
      
      const paths = [tealPath.current, mustardPath.current, coralPath.current, charcoalPath.current];
      
      paths.forEach((path, i) => {
         // Reset each path to hidden state before starting its animation
         gsap.set(path, { attr: { d: HIDDEN } });
         
         outTl.to(path, {
           attr: { d: MID },
           duration: 0.4,
           ease: "power2.in"
         }, i * 0.1) // Stagger start
         .to(path, {
           attr: { d: COVER },
           duration: 0.4,
           ease: "power2.out"
         }, (i * 0.1) + 0.4); // Complete the movement to cover
      });
    };
    
    return () => {
      globalTriggerTransition = null;
    };
  }, [pathname, router]);

  return (
    <>
      <svg 
        className="fixed inset-0 z-[9999] pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
         <path ref={tealPath} fill="var(--color-teal)" />
         <path ref={mustardPath} fill="var(--color-mustard)" />
         <path ref={coralPath} fill="var(--color-coral)" />
         <path ref={charcoalPath} fill="var(--color-charcoal)" />
      </svg>
      <div ref={container}>{children}</div>
    </>
  );
}
