"use client";

import { useState, useCallback } from "react";
import FloatingBubble from "@/components/ui/FloatingBubble";

interface BubbleConfig {
  logo: string;
  color: string;
  size: number;
  pos: { left?: string; right?: string; top?: string; bottom?: string };
}

const BUBBLES: BubbleConfig[] = [
  { logo: "/images/logo/python.png",   color: "var(--color-cream)",     size: 110, pos: { left: "6%",  top: "18%" } },
  { logo: "/images/logo/sql.png",      color: "var(--color-mustard)",   size: 95,  pos: { right: "8%",  top: "14%" } },
  { logo: "/images/logo/tableau.png",  color: "var(--color-sage)",      size: 90,  pos: { left: "3%",  bottom: "28%" } },
  { logo: "/images/logo/powerbi.png",  color: "var(--color-charcoal)",  size: 120, pos: { right: "4%",  bottom: "30%" } },
  { logo: "/images/logo/notion.png",   color: "var(--color-coral)",     size: 100, pos: { left: "10%", top: "55%" } },
  { logo: "/images/logo/gcolab.png",   color: "var(--color-violet)",    size: 105, pos: { right: "10%", top: "48%" } },
  { logo: "/images/logo/msoffice.png", color: "var(--color-teal)",      size: 90,  pos: { left: "20%", bottom: "8%" } },
  { logo: "/images/logo/dbeaver.png",  color: "var(--color-peach)",     size: 115, pos: { right: "18%", bottom: "6%" } },
];

export default function BubbleCluster() {
  const [alive, setAlive] = useState<boolean[]>(() => BUBBLES.map(() => true));

  const handlePop = useCallback((index: number) => {
    setAlive((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
    setTimeout(() => {
      setAlive((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }, 5000);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {BUBBLES.map((b, i) =>
        alive[i] ? (
          <FloatingBubble
            key={i}
            logo={b.logo}
            color={b.color}
            size={b.size}
            index={i}
            onPop={handlePop}
            style={b.pos}
          />
        ) : null
      )}
    </div>
  );
}
