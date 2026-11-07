"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/experience";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./Experience.module.css";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 80%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);
  const sortedExperience = [...experience].sort((a, b) =>
    b.sortStart.localeCompare(a.sortStart),
  );

  const toggleRole = (company: string) => {
    setExpandedRoles((current) =>
      current.includes(company)
        ? current.filter((entry) => entry !== company)
        : [...current, company],
    );
  };

  return (
    <section
      className={styles.section}
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-title"
    >
      <div className={styles.heading}>
        <div>
          <SectionLabel number="04" label="Experience" />
          <h2 className={styles.title} id="experience-title">
            Work in
            <br />
            progress.
          </h2>
        </div>
        <p className={styles.note}>
          Roles across product engineering, technical leadership and client
          delivery.
        </p>
      </div>

      <div className={styles.timeline}>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.railBase} />
          <motion.span
            className={styles.railProgress}
            style={{ scaleY: reduceMotion ? 1 : lineProgress }}
          />
        </div>
        <div className={styles.roles}>
          {sortedExperience.map((role, index) => {
            const expanded = expandedRoles.includes(role.company);

            return (
              <article className={styles.role} key={role.company}>
                <span className={`${styles.date} eyebrow`}>{role.dateRange}</span>
                <div className={styles.roleContent}>
                  <span className={`${styles.index} eyebrow`}>0{index + 1}</span>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <p className={styles.company}>{role.company}</p>
                  <ul className={styles.bullets}>
                    {role.keyBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                    {expanded &&
                      role.additionalBullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                  </ul>
                  {role.additionalBullets.length > 0 && (
                    <button
                      className={`${styles.more} eyebrow`}
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => toggleRole(role.company)}
                      onMouseEnter={() =>
                        setExpandedRoles((current) =>
                          current.includes(role.company)
                            ? current
                            : [...current, role.company],
                        )
                      }
                      onMouseLeave={(event) => {
                        if (!event.currentTarget.matches(":focus")) {
                          setExpandedRoles((current) =>
                            current.filter((entry) => entry !== role.company),
                          );
                        }
                      }}
                    >
                      {expanded ? "Show fewer details −" : "More details +"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
