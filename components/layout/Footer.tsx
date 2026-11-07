"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, profile } from "@/data/profile";
import styles from "./Footer.module.css";

export function Footer() {
  const [time, setTime] = useState("--:--");

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

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <span className="eyebrow">{profile.location}</span>
        <a className={`${styles.backTop} eyebrow`} href="#top">
          Back to top ↑
        </a>
      </div>
      <a className={styles.name} href="#top" aria-label="Ananthu Mohan, back to top">
        ANANTHU MOHAN
      </a>
      <div className={styles.bottom}>
        <div className={styles.socials}>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`}>
            Email <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <span className="eyebrow">Alappuzha · {time} IST</span>
        <span className="eyebrow">© {new Date().getFullYear()} · {profile.name}</span>
      </div>
    </footer>
  );
}
