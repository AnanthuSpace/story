"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
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
        <a
          className={`${styles.backTop} eyebrow`}
          href="#top"
          aria-label="Back to top"
        >
          <ArrowUp size={19} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.brandLine}>
        <picture className={styles.brandPicture}>
          <source
            media="(max-width: 600px)"
            srcSet="/brand/logo-final-dark.svg"
          />
          <Image
            className={styles.brandImage}
            src="/brand/logo-lockup-dark.svg"
            alt="Ananthu Mohan, Software Engineer"
            width={1370}
            height={360}
            unoptimized
          />
        </picture>
      </div>
      <a className={styles.name} href="#top" aria-label="Ananthu Mohan, back to top">
        ANANTHU MOHAN<span>.</span>
      </a>
      <div className={styles.bottom}>
        <SocialLinks className={styles.socials} />
        <span className="eyebrow">Alappuzha · {time} IST</span>
        <span className="eyebrow">© {new Date().getFullYear()} · {profile.name}</span>
      </div>
    </footer>
  );
}
