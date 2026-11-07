"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./MenuOverlay.module.css";

const links = [
  { number: "01", label: "Work", href: "#selected-work" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Experience", href: "#experience" },
  { number: "04", label: "Contact", href: "#contact" },
];

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    document.querySelector<HTMLAnchorElement>("#site-menu a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={reduceMotion ? undefined : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.topline}>
            <span className="eyebrow">Navigation index</span>
            <span className="eyebrow">Alappuzha · India</span>
          </div>
          <nav className={styles.nav} aria-label="Main navigation">
            {links.map((link, index) => (
              <motion.a
                key={link.number}
                className={styles.link}
                href={link.href}
                onClick={onClose}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.14 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={`${styles.number} eyebrow`}>{link.number}</span>
                <span className={styles.label}>{link.label}</span>
                <span className={styles.rule} aria-hidden="true" />
              </motion.a>
            ))}
          </nav>
          <p className={`${styles.footer} eyebrow`}>Choose a page to explore</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
