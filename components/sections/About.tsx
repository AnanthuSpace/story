"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./About.module.css";

const summaryWords = profile.summary.split(/\s+/);
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
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#E8D2B5", "#590907"],
  );
  const color = useTransform(scrollYProgress, [0, 1], ["#590907", "#F4E9D9"]);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
      style={
        reduceMotion
          ? { backgroundColor: "var(--burgundy)", color: "var(--cream-light)" }
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
            A practical builder,
            <br />
            from idea to launch.
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
                className={styles.word}
                key={`${word}-${index}`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
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
      <div className={styles.education}>
        <span className="eyebrow">Education</span>
        <p>
          <strong>{profile.education.qualification}</strong>
          <span>{profile.education.institution}</span>
          <span>{profile.education.dates}</span>
        </p>
      </div>
      <span className={`${styles.index} eyebrow`}>02 / 04 — Profile</span>
    </motion.section>
  );
}
