"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/data/skills";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechIcon } from "@/components/ui/TechIcon";
import styles from "./Stack.module.css";

const stackCategories = [
  "Languages",
  "Frontend",
  "Backend & Real-Time",
  "Databases & Caching",
  "Cloud & DevOps",
  "Auth & Payments",
  "Architecture Patterns",
  "Testing & Tooling",
  "AI Development Tools",
] as const;

const panelCopy: Record<(typeof stackCategories)[number], string> = {
  Languages: "Typed foundations",
  Frontend: "Interfaces & state",
  "Backend & Real-Time": "Services & realtime",
  "Databases & Caching": "Persistence & cache",
  "Cloud & DevOps": "Deploy & operate",
  "Auth & Payments": "Identity & billing",
  "Architecture Patterns": "Patterns & structure",
  "Testing & Tooling": "Quality & workflow",
  "AI Development Tools": "Assisted workflow",
};

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    if (!section || !track) return;
    let disposed = false;
    let generation = 0;
    let revertContext = () => {};

    const syncLayout = async () => {
      const currentGeneration = ++generation;
      revertContext();
      revertContext = () => {};
      if (reducedMotion.matches || !desktop.matches) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (
        disposed ||
        currentGeneration !== generation ||
        !sectionRef.current ||
        !trackRef.current
      ) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      revertContext = () => context.revert();
      ScrollTrigger.refresh();
    };

    void syncLayout();
    desktop.addEventListener("change", syncLayout);
    reducedMotion.addEventListener("change", syncLayout);
    return () => {
      disposed = true;
      generation += 1;
      desktop.removeEventListener("change", syncLayout);
      reducedMotion.removeEventListener("change", syncLayout);
      revertContext();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="stack"
      aria-labelledby="stack-title"
    >
      <div className={styles.intro}>
        <SectionLabel number="06" label="Stack" />
        <h2 className={styles.title} id="stack-title">
          Tools of
          <br />
          the trade.
        </h2>
        <p className={styles.note}>A considered stack, chosen to get products shipped.</p>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track} ref={trackRef}>
          {stackCategories.map((category, index) => {
            const group = skillGroups.find((entry) => entry.category === category);
            if (!group) return null;

            return (
              <article className={styles.panel} key={category}>
                <span className={styles.number} aria-hidden="true">
                  0{index + 1}
                </span>
                <div className={styles.panelContent}>
                  <p className={`${styles.category} eyebrow`}>{category}</p>
                  <h3 className={styles.skills}>
                    {group.skills.map((skill) => (
                      <span className={styles.skill} key={skill}>
                        <TechIcon name={skill} size={26} />
                        {skill}
                      </span>
                    ))}
                  </h3>
                  <p className={`${styles.subLabel} eyebrow`}>{panelCopy[category]}</p>
                </div>
                <div className={styles.progress} aria-hidden="true">
                  <span style={{ width: `${((index + 1) / stackCategories.length) * 100}%` }} />
                </div>
                <span className={`${styles.panelCount} eyebrow`}>
                  0{index + 1} / 0{stackCategories.length}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
