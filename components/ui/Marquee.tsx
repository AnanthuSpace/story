"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RED_INTENSITY } from "@/data/theme";
import styles from "./Marquee.module.css";

const stackLine =
  "React • Next.js • NestJS • Node.js • TypeScript • MongoDB • PostgreSQL • AWS •";

export function Marquee({ text = stackLine }: { text?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={styles.marquee}
      data-cursor-surface={RED_INTENSITY === "bold" ? "red" : undefined}
      aria-label={text}
    >
      <motion.div
        className={styles.track}
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        <span className={styles.copy}>{`${text} `}</span>
        <span className={styles.copy}>{`${text} `}</span>
      </motion.div>
    </div>
  );
}
