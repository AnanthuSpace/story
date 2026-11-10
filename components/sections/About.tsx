"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechIcon } from "@/components/ui/TechIcon";
import styles from "./About.module.css";

const summaryWords = profile.summary.split(/\s+/);
const highlightedTerms = ["production", "real", "time", "AWS", "based", "AI", "assisted"];
const normalizedHighlightedTerms = new Set(
  highlightedTerms.map((term) => term.toLowerCase()),
);
const wordVariants = {
  hidden: { opacity: 0.18 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const backgroundPaper = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const backgroundInk = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textInk = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const textPaper = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundColor = useMotionTemplate`color-mix(in srgb, var(--paper) ${backgroundPaper}%, var(--ink) ${backgroundInk}%)`;
  const color = useMotionTemplate`color-mix(in srgb, var(--ink) ${textInk}%, var(--paper) ${textPaper}%)`;

  return (
    <motion.section
      ref={sectionRef}
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
      style={
        reduceMotion
          ? { backgroundColor: "var(--ink)", color: "var(--paper)" }
          : { backgroundColor, color }
      }
    >
      <div className={styles.top}>
        <SectionLabel number="02" label="About" />
        <p className={`${styles.location} eyebrow`}>{profile.location}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.statement}>
          <h2 className={styles.title} id="about-title">
            {profile.aboutHeadline}
          </h2>
          <motion.p
            className={styles.summary}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.018 },
              },
            }}
          >
            {summaryWords.map((word, index) => (
              <motion.span
                className={`${styles.word} ${
                  normalizedHighlightedTerms.has(
                    word.toLowerCase().replace(/[.,;:!?]$/, ""),
                  )
                    ? styles.highlightWord
                    : ""
                }`}
                key={`${word}-${index}`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          <div className={styles.pillars} aria-label="Engineering pillars">
            {profile.pillars.map((pillar) => (
              <article className={styles.pillar} key={pillar.number}>
                <motion.span
                  className={styles.pillarAccent}
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
                <span className={`${styles.pillarNumber} eyebrow`}>
                  {pillar.number}
                </span>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
                <div className={styles.pillarTech}>
                  {pillar.technologies.map((technology) => (
                    <span className={styles.pillarTechItem} key={technology}>
                      <TechIcon name={technology} size={16} />
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.facts} aria-label="Career at a glance">
          <div className={styles.fact}>
            <span className={styles.factNumber}>2+</span>
            <span className={`${styles.factLabel} eyebrow`}>Years experience</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factNumber}>15+</span>
            <span className={`${styles.factLabel} eyebrow`}>Projects contributed</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factNumber}>{experience.length}</span>
            <span className={`${styles.factLabel} eyebrow`}>Roles</span>
          </div>
        </div>
      </div>
      <span className={`${styles.index} eyebrow`}>02 / 04 — Profile</span>
    </motion.section>
  );
}
