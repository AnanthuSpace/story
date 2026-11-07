"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ThemeSection({
  children,
  tone = "cream",
}: {
  children: ReactNode;
  tone?: "cream" | "burgundy" | "sage";
}) {
  const reduceMotion = useReducedMotion();
  const colors = {
    cream: { backgroundColor: "var(--cream)", color: "var(--burgundy)" },
    burgundy: { backgroundColor: "var(--burgundy)", color: "var(--cream-light)" },
    sage: { backgroundColor: "var(--sage)", color: "var(--burgundy)" },
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
