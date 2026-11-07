"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { profile } from "@/data/profile";
import styles from "./Hero.module.css";

const lines = [
  [
    { text: "Full", kind: "plain" },
    { text: "Stack", kind: "plain" },
  ],
  [
    { text: "developer", kind: "plain" },
    { text: "building", kind: "plain" },
  ],
  [
    { text: "products", kind: "outline" },
    { text: "that", kind: "plain" },
  ],
  [{ text: "scale", kind: "italic" }],
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={`${styles.kicker} eyebrow`}>
          PORTFOLIO — 2026 · Alappuzha, Kerala · 2+ yrs
        </p>
        <h1 className={styles.title} id="hero-title">
          {lines.map((line, lineIndex) => (
            <span className={styles.line} key={lineIndex}>
              {line.map((word, wordIndex) => (
                <motion.span
                  className={[
                    styles.word,
                    word.kind === "italic" ? styles.italic : "",
                    word.kind === "outline" ? styles.outline : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={word.text}
                  initial={reduceMotion ? false : { y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.95,
                    delay: reduceMotion ? 0 : 0.1 + lineIndex * 0.09 + wordIndex * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word.text}
                  {wordIndex < line.length - 1 ? "\u00a0" : ""}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>
        <div className={styles.bottom}>
          <p className={styles.intro}>
            CTO &amp; Partner at Veevity Technologies LLP. I build production web
            apps with Next.js, NestJS and TypeScript, bringing 2+ years of
            experience and contributions to 15+ projects.
          </p>
          <p className={`${styles.byline} eyebrow`}>
            {profile.name}
            <br />
            {profile.role}
          </p>
        </div>
      </div>
      <HeroVisual className={styles.visual} />
      <span className={`${styles.index} eyebrow`}>01 / 04 — Introduction</span>
    </section>
  );
}
