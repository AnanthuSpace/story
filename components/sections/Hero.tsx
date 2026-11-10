"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
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
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || profile.rotatingRoles.length < 2) return;

    const hero = heroRef.current;
    if (!hero) return;

    let interval: number | null = null;
    let isVisible = false;

    const stopRotation = () => {
      if (interval !== null) {
        window.clearInterval(interval);
        interval = null;
      }
    };

    const syncRotation = () => {
      stopRotation();
      if (!isVisible || document.hidden) return;

      interval = window.setInterval(() => {
        setRoleIndex((current) => (current + 1) % profile.rotatingRoles.length);
      }, 3000);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncRotation();
    });
    observer.observe(hero);
    document.addEventListener("visibilitychange", syncRotation);

    return () => {
      stopRotation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncRotation);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
    >
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
          <div>
            <p className={styles.intro}>
              CTO &amp; Partner at Veevity Technologies LLP. I build production
              web apps with Next.js, NestJS and TypeScript, bringing 2+ years of
              experience and contributions to 15+ projects.
            </p>
            <p className={styles.roleLine} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={profile.rotatingRoles[roleIndex]}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                >
                  {profile.rotatingRoles[reduceMotion ? 0 : roleIndex]}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>
          <p className={`${styles.byline} eyebrow`}>
            {profile.name}
            <br />
            {profile.tagline}
          </p>
        </div>
      </div>
      <HeroVisual className={styles.visual} />
      <span className={`${styles.index} eyebrow`}>01 / 04 — Introduction</span>
    </section>
  );
}
