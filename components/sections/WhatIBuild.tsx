"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { capabilities } from "@/data/capabilities";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./WhatIBuild.module.css";

export function WhatIBuild() {
  const [active, setActive] = useState<string | null>(capabilities[0]?.number ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="what-i-build-title">
      <div className={styles.heading}>
        <div>
          <SectionLabel number="03" label="What I build" />
          <h2 className={styles.title} id="what-i-build-title">
            From interface
            <br />
            to infrastructure.
          </h2>
        </div>
        <p className={styles.note}>
          Practical product engineering across the stack, from first endpoint
          to deployment.
        </p>
      </div>

      <div className={styles.list}>
        {capabilities.map((capability) => {
          const isOpen = active === capability.number;

          return (
            <div className={styles.item} key={capability.number}>
              <button
                className={styles.trigger}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`capability-${capability.number}`}
                onClick={() => setActive(isOpen ? null : capability.number)}
              >
                <span className={`${styles.number} eyebrow`}>{capability.number}</span>
                <span className={styles.name}>{capability.title}</span>
                <span className={styles.iconCircle} aria-hidden="true">
                  {isOpen ? (
                    <Minus className={styles.arrow} size={19} />
                  ) : (
                    <Plus className={styles.arrow} size={19} />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.content}
                    id={`capability-${capability.number}`}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className={styles.description}>
                      {capability.technologies.join(" · ")}
                    </p>
                    <span className={`${styles.caption} eyebrow`}>Selected technologies</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
