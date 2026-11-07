"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function SplitText({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const timer = window.setTimeout(() => setFallbackVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className={className} aria-label={text} data-reveal-mask="">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="split-text__mask"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { y: "105%" }}
            animate={fallbackVisible ? { y: "0%", transition: { duration: 0 } } : undefined}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  );
}
