"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ThemeSection({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  tone?: "paper" | "ink" | "ice-dark";
}) {
  const reduceMotion = useReducedMotion();
  const colors = {
    paper: { backgroundColor: "var(--paper)", color: "var(--ink)" },
    ink: { backgroundColor: "var(--ink)", color: "var(--paper)" },
    "ice-dark": { backgroundColor: "var(--ice-dark)", color: "var(--ink)" },
  };

  return (
    <motion.section
      initial={false}
      whileInView={colors[tone]}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.8 }}
    >
      {children}
    </motion.section>
  );
}
