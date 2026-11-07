"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition" | "animate"
> & {
  children: ReactNode;
  delay?: number;
};

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const fallbackTimer = useRef<number | null>(null);

  useEffect(() => {
    fallbackTimer.current = window.setTimeout(() => {
      setFallbackVisible(true);
    }, 1500);

    return () => {
      if (fallbackTimer.current !== null) {
        window.clearTimeout(fallbackTimer.current);
      }
    };
  }, []);

  const handleViewportEnter = () => {
    if (fallbackTimer.current !== null) {
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  };

  return (
    <motion.div
      data-reveal=""
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={
        fallbackVisible
          ? { opacity: 1, y: 0, transition: { duration: 0 } }
          : undefined
      }
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
