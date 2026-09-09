"use client";

import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import MagneticLink from "@/components/ui/MagneticLink";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100 && y > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[80] transition-transform duration-500 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <TransitionLink href="/" className="pointer-events-auto shrink-0">
        <MagneticLink>
          <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter text-[var(--color-charcoal)] hover:text-[var(--color-coral)] transition-colors">
            DF<span className="text-[var(--color-coral)]">.</span>
          </span>
        </MagneticLink>
      </TransitionLink>

      <nav className="pointer-events-auto bg-[var(--color-cream)]/80 backdrop-blur-md border border-[var(--color-charcoal)]/8 rounded-full px-4 md:px-6 py-2 shadow-lg flex items-center gap-5">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <TransitionLink key={link.href} href={link.href}>
              <MagneticLink strength={0.2}>
                <span
                  className={`relative text-xs font-medium uppercase tracking-[0.15em] transition-colors py-1 ${
                    active ? "text-[var(--color-coral)]" : "text-[var(--color-charcoal)] hover:text-[var(--color-coral)]"
                  }`}
                >
                  {link.label}
                  {active && <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[var(--color-coral)] rounded-full" />}
                </span>
              </MagneticLink>
            </TransitionLink>
          );
        })}
      </nav>
    </header>
  );
}
