"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { profile } from "@/data/profile";
import styles from "./Header.module.css";

export function Header() {
  const [time, setTime] = useState("--:--");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let observer: IntersectionObserver | undefined;
    const observeSections = () => {
      observer?.disconnect();
      const headerBottom = header.getBoundingClientRect().bottom;
      const bottomInset = Math.max(0, window.innerHeight - headerBottom - 1);
      observer = new IntersectionObserver(
        () => {
          const centerX = window.innerWidth / 2;
          const headerY = header.getBoundingClientRect().bottom - 1;
          const sections = Array.from(
            document.querySelectorAll<HTMLElement>("main > section, footer"),
          );
          const section = sections
            .filter((item) => {
              const rect = item.getBoundingClientRect();
              return rect.top <= headerY && rect.bottom > headerY;
            })
            .sort(
              (first, second) =>
                second.getBoundingClientRect().top -
                first.getBoundingClientRect().top,
            )[0];
          const panels =
            section?.id === "stack"
              ? section.querySelectorAll<HTMLElement>("article")
              : undefined;
          const activePanel = panels
            ? Array.from(panels).find((panel) => {
                const rect = panel.getBoundingClientRect();
                return rect.left <= centerX && rect.right > centerX;
              })
            : undefined;
          if (section?.id === "about") {
            header.dataset.theme = "dark";
            return;
          }
          const surface = activePanel ?? section;
          const background = surface
            ? getComputedStyle(surface).backgroundColor
            : "";
          const colors = getComputedStyle(document.documentElement);
          const ink = colors.getPropertyValue("--ink").trim();
          const accent = colors.getPropertyValue("--accent").trim();
          const normalizedBackground = background.replace(/\s+/g, "").toLowerCase();
          const normalizedInk = ink.toLowerCase();
          const normalizedAccent = accent.toLowerCase();
          header.dataset.theme =
            normalizedBackground === normalizedAccent ||
            normalizedBackground === "rgb(239,35,60)"
              ? "red"
              : normalizedBackground === normalizedInk ||
                  normalizedBackground === "rgb(17,18,23)"
                ? "dark"
                : "light";
        },
        {
          rootMargin: `-${headerBottom}px 0px -${bottomInset}px 0px`,
          threshold: 0,
        },
      );
      document
        .querySelectorAll("main > section, main > section#stack article, footer")
        .forEach((section) => observer?.observe(section));
    };

    const updateHeaderSize = () => {
      observeSections();
    };

    updateHeaderSize();
    window.addEventListener("resize", updateHeaderSize, { passive: true });

    return () => {
      window.removeEventListener("resize", updateHeaderSize);
      observer?.disconnect();
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={styles.header}
        data-menu-open={menuOpen}
        data-theme="light"
      >
        <motion.span
          className={styles.scrollProgress}
          style={{ scaleX: scrollProgress }}
          aria-hidden="true"
        />
        <Link
          className={styles.brand}
          href="/#top"
          aria-label="Ananthu Mohan, Software Engineer, home"
        >
          <Logo
            variant="lockup"
            size="var(--header-logo-h)"
            tone={menuOpen ? "on-dark" : "auto"}
            ariaHidden
          />
        </Link>
        <div className={styles.meta}>
          <span className="eyebrow" aria-label={`Local time in Alappuzha: ${time}`}>
            Alappuzha {time} IST
          </span>
          <span className={`${styles.availability} eyebrow`}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            <span aria-label={profile.availability}>Available</span>
          </span>
        </div>
        <button
          ref={menuButtonRef}
          className={`${styles.menuButton} eyebrow`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </header>
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
    </>
  );
}
