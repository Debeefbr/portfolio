"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap, Draggable } from "@/lib/gsap";

interface Props {
  logo: string;
  color: string;
  size: number;
  index: number;
  onPop: (index: number) => void;
  style: { left?: string; right?: string; top?: string; bottom?: string };
}

const ACCENT_COLORS = ["var(--color-coral)", "var(--color-mustard)", "var(--color-teal)", "var(--color-violet)"];

function spawnParticles(x: number, y: number, color: string) {
  const count = 8;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const particleColor = i % 2 === 0 ? color : ACCENT_COLORS[i % ACCENT_COLORS.length];
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${particleColor};
      pointer-events: none;
      z-index: 9998;
      will-change: transform, opacity;
    `;
    document.body.appendChild(el);

    gsap.to(el, {
      duration: 0.6 + Math.random() * 0.3,
      physics2D: {
        velocity: 150 + Math.random() * 130,
        angle: Math.random() * 360,
        gravity: 300,
      },
      opacity: 0,
      ease: "power2.out",
      onComplete: () => el.remove(),
    });
  }
}

export default function FloatingBubble({ logo, color, size, index, onPop, style }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const draggableInstance = useRef<Draggable[] | null>(null);
  const respawnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPopping = useRef(false);

  const startFloat = useCallback(() => {
    if (!floatRef.current) return;
    floatTween.current = gsap.to(floatRef.current, {
      y: `random(-25, 25)`,
      rotation: `random(-6, 6)`,
      duration: `random(2.5, 4)`,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: index * 0.3,
    });
  }, [index]);

  const handlePop = useCallback(() => {
    if (isPopping.current) return;
    isPopping.current = true;

    const bubble = bubbleRef.current;
    if (!bubble) return;

    if (floatTween.current) {
      floatTween.current.kill();
      floatTween.current = null;
    }
    if (draggableInstance.current) {
      draggableInstance.current.forEach((d) => d.kill());
      draggableInstance.current = null;
    }

    const rect = bubble.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + size * 0.4;

    gsap.to(bubble, {
      scale: 1.3,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    spawnParticles(cx, cy, color);

    respawnTimer.current = setTimeout(() => {
      onPop(index);
    }, 5000);
  }, [color, index, onPop, size]);

  useEffect(() => {
    const float = floatRef.current;
    const bubble = bubbleRef.current;
    if (!float || !bubble) return;

    startFloat();

    draggableInstance.current = Draggable.create(bubble, {
      type: "x,y",
      inertia: true,
      edgeResistance: 0.65,
      onDragStart() {
        if (floatTween.current) floatTween.current.pause();
        gsap.to(bubble, { scale: 1.1, duration: 0.2, ease: "power2.out" });
      },
      onDragEnd() {
        if (floatTween.current) floatTween.current.resume();
        gsap.to(bubble, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      },
      cursor: "grab",
      activeCursor: "grabbing",
    });

    return () => {
      if (floatTween.current) floatTween.current.kill();
      if (draggableInstance.current) draggableInstance.current.forEach((d) => d.kill());
      if (respawnTimer.current) clearTimeout(respawnTimer.current);
    };
  }, [startFloat]);

  const bodyW = size;
  const bodyH = size * 1.15;
  const knotSize = size * 0.12;
  const stringH = size * 0.45;

  return (
    <div
      ref={wrapperRef}
      className="absolute pointer-events-auto z-10"
      style={{ ...style, transformOrigin: "center top" }}
    >
      <div ref={floatRef}>
        <div
          ref={bubbleRef}
          data-cursor="POP"
          onClick={handlePop}
          className="flex flex-col items-center cursor-pointer select-none touch-none will-change-transform"
          style={{ width: bodyW }}
        >
          {/* Balloon body */}
          <div
            className="flex items-center justify-center relative"
            style={{
              width: bodyW,
              height: bodyH,
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              background: color,
              boxShadow: `0 6px 24px rgba(0,0,0,0.12), inset 0 -${size * 0.06}px ${size * 0.15}px rgba(0,0,0,0.08)`,
            }}
          >
            {/* Shine highlight */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "30%",
                height: "30%",
                top: "12%",
                left: "18%",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.35)",
                filter: "blur(2px)",
              }}
            />
            <img
              src={logo}
              alt=""
              className="relative z-10 pointer-events-none"
              style={{ width: "50%", height: "50%", objectFit: "contain" }}
              draggable={false}
            />
          </div>

          {/* Knot */}
          <div
            className="relative"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${knotSize}px solid transparent`,
              borderRight: `${knotSize}px solid transparent`,
              borderTop: `${knotSize * 1.4}px solid ${color}`,
              marginTop: -1,
              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.08))",
            }}
          />

          {/* String */}
          <svg
            width={knotSize * 3}
            height={stringH}
            viewBox={`0 0 ${knotSize * 3} ${stringH}`}
            className="pointer-events-none"
            style={{ marginTop: -1 }}
          >
            <path
              d={`M${knotSize * 1.5},0 Q${knotSize * 2.5},${stringH * 0.3} ${knotSize * 0.8},${stringH * 0.55} Q${knotSize * 0.2},${stringH * 0.75} ${knotSize * 1.5},${stringH}`}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.5}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
