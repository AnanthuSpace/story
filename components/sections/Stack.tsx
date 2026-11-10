"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/data/skills";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechIcon } from "@/components/ui/TechIcon";
import { ArrowDown } from "lucide-react";
import styles from "./Stack.module.css";

const STACK_SNAP_MOBILE = false;
const STACK_SCRUB_TOUCH = 1;

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
  const progressRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    let disposed = false;
    let resizeTimer: number | undefined;
    let lastWidth = window.innerWidth;
    let matchMedia:
      | ReturnType<typeof import("gsap").default.matchMedia>
      | undefined;
    let gsapInstance: typeof import("gsap").default | undefined;
    let scrollTrigger: typeof import("gsap/ScrollTrigger").default | undefined;

    const refreshOnWidthChange = () => {
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeTimer = undefined;
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        scrollTrigger?.refresh();
      }, 200);
    };
    const refreshAfterOrientationChange = () => {
      lastWidth = window.innerWidth;
      scrollTrigger?.refresh();
    };

    const initialize = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed || !sectionRef.current || !trackRef.current) return;

      gsapInstance = gsap;
      scrollTrigger = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      matchMedia = gsap.matchMedia(section);
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const isTouch = window.matchMedia(
          "(hover: none), (pointer: coarse)",
        ).matches;
        const panelCount = track.children.length;
        const animation = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            id: "stack-horizontal",
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: isTouch ? STACK_SCRUB_TOUCH : 0.6,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            ...(isTouch && STACK_SNAP_MOBILE
              ? {
                  snap: {
                    snapTo: 1 / Math.max(1, panelCount - 1),
                    duration: 0.3,
                    ease: "power1.inOut",
                  },
                }
              : {}),
            onToggle: (self) => {
              track.style.willChange = self.isActive ? "transform" : "";
            },
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (counterRef.current) {
                const current = Math.min(
                  panelCount,
                  Math.max(1, Math.round(self.progress * (panelCount - 1)) + 1),
                );
                counterRef.current.textContent = `${String(current).padStart(2, "0")} / ${String(panelCount).padStart(2, "0")}`;
              }
              if (hintRef.current) {
                hintRef.current.style.opacity =
                  self.progress >= 0.05 ? "0" : "1";
              }
            },
          },
        });

        return () => {
          animation.scrollTrigger?.kill();
          gsap.set(track, { clearProps: "transform,willChange" });
        };
      });

      window.addEventListener("resize", refreshOnWidthChange, {
        passive: true,
      });
      window.addEventListener(
        "orientationchange",
        refreshAfterOrientationChange,
        { passive: true },
      );

      void document.fonts?.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });

      ScrollTrigger.refresh();
    };

    void initialize();

    return () => {
      disposed = true;
      window.removeEventListener("resize", refreshOnWidthChange);
      window.removeEventListener(
        "orientationchange",
        refreshAfterOrientationChange,
      );
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
      matchMedia?.revert();
      scrollTrigger
        ?.getAll()
        .filter((trigger) => trigger.vars.id === "stack-horizontal")
        .forEach((trigger) => trigger.kill());
      if (gsapInstance) {
        gsapInstance.set(track, { clearProps: "transform,willChange" });
      } else {
        track.style.removeProperty("transform");
        track.style.removeProperty("will-change");
      }

      const spacer = section.parentElement;
      if (spacer?.classList.contains("pin-spacer") && spacer.parentElement) {
        spacer.parentElement.insertBefore(section, spacer);
        spacer.remove();
      }
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
              <article
                className={`${styles.panel} ${
                  category === "Frontend" ||
                  category === "Backend & Real-Time" ||
                  category === "Testing & Tooling" ||
                  category === "AI Development Tools"
                    ? styles.densePanel
                    : ""
                }`}
                key={category}
              >
                <span className={styles.number} aria-hidden="true">
                  0{index + 1}
                </span>
                <div className={styles.panelContent}>
                  <p className={`${styles.category} eyebrow`}>{category}</p>
                  <h3
                    className={`${styles.skills} ${
                      category === "Frontend" ||
                      category === "Backend & Real-Time" ||
                      category === "Testing & Tooling" ||
                      category === "AI Development Tools"
                        ? styles.denseSkills
                        : ""
                    }`}
                  >
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
      <div className={styles.mobileAids} aria-hidden="true">
        <p className={styles.hint} ref={hintRef}>
          <ArrowDown size={14} strokeWidth={1.75} />
          <span>Swipe up to explore</span>
        </p>
        <div className={styles.scrollProgress}>
          <span className={styles.scrollProgressTrack}>
            <span ref={progressRef} />
          </span>
          <span className={styles.scrollCounter} ref={counterRef}>
            01 / 09
          </span>
        </div>
      </div>
    </section>
  );
}
