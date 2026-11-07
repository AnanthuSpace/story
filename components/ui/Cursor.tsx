"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: -40, y: -40 });
  const reduceMotion = useReducedMotion();
  const motionX = useMotionValue(-40);
  const motionY = useMotionValue(-40);
  const x = useSpring(motionX, { stiffness: 500, damping: 35, mass: 0.35 });
  const y = useSpring(motionY, { stiffness: 500, damping: 35, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(finePointer.matches && !reduceMotion);
    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        motionX.set(pointer.current.x);
        motionY.set(pointer.current.y);
      });
    };

    const updateActive = (target: EventTarget | null) => {
      const active =
        target instanceof Element &&
        Boolean(target.closest("a, button, [data-cursor]"));
      cursorRef.current?.setAttribute("data-active", String(active));
    };
    const activate = (event: PointerEvent) => updateActive(event.target);
    const deactivate = (event: PointerEvent) => {
      if (
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest("a, button, [data-cursor]")
      ) {
        updateActive(event.relatedTarget);
        return;
      }
      updateActive(null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", activate, { passive: true });
    window.addEventListener("pointerout", deactivate, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", activate);
      window.removeEventListener("pointerout", deactivate);
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, [enabled, motionX, motionY]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      data-active="false"
      style={{ x, y }}
      aria-hidden="true"
    >
      <span className="custom-cursor__ring" />
    </motion.div>
  );
}
