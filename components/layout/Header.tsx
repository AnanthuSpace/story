"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import styles from "./Header.module.css";

export function Header() {
  const [time, setTime] = useState("--:--");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  return (
    <>
      <header className={styles.header} data-menu-open={menuOpen}>
        <a className={styles.brand} href="#top" aria-label="Ananthu Mohan, home">
          A.M
        </a>
        <div className={styles.meta}>
          <span className="eyebrow" aria-label={`Local time in Alappuzha: ${time}`}>
            Alappuzha {time} IST
          </span>
          <span className={`${styles.availability} eyebrow`}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            Open to conversations
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
