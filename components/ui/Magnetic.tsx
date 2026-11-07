"use client";

import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const finePointerEnabled = useRef(false);
  const pendingPosition = useRef({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const x = useSpring(motionX, { stiffness: 200, damping: 15 });
  const y = useSpring(motionY, { stiffness: 200, damping: 15 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reset = () => {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
      motionX.set(0);
      motionY.set(0);
    };
    const handlePointerChange = (event: MediaQueryListEvent) => {
      finePointerEnabled.current = event.matches && !reduceMotion;
      if (!event.matches || reduceMotion) reset();
    };

    finePointerEnabled.current = finePointer.matches && !reduceMotion;
    if (!finePointerEnabled.current) reset();
    finePointer.addEventListener("change", handlePointerChange);

    return () => {
      finePointerEnabled.current = false;
      finePointer.removeEventListener("change", handlePointerChange);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [reduceMotion, motionX, motionY]);

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !finePointerEnabled.current ||
      event.pointerType !== "mouse" ||
      !ref.current
    ) {
      return;
    }
    const bounds = ref.current.getBoundingClientRect();
    pendingPosition.current = {
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.12,
    };

    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      motionX.set(pendingPosition.current.x);
      motionY.set(pendingPosition.current.y);
    });
  };

  const reset = () => {
    if (frame.current !== null) {
      window.cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
