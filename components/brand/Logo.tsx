"use client";

import dynamic from "next/dynamic";
import { memo, type CSSProperties } from "react";
import styles from "./Logo.module.css";

const LogoLockup = dynamic(() =>
  import("./LogoLockup").then((module) => module.LogoLockup),
);

export type LogoProps = {
  variant?: "mark" | "lockup";
  tone?: "auto" | "on-light" | "on-dark" | "on-red";
  size?: number | string;
  withTagline?: boolean;
  tile?: boolean;
  className?: string;
  title?: string;
  ariaHidden?: boolean;
};

function LogoComponent({
  variant = "mark",
  tone = "auto",
  size = 40,
  withTagline = true,
  tile = false,
  className,
  title,
  ariaHidden = false,
}: LogoProps) {
  const classes = [styles.logo, className].filter(Boolean).join(" ");
  const accessibility = ariaHidden
    ? { "aria-hidden": true as const }
    : {
        role: "img" as const,
        "aria-label": title ?? "Ananthu Mohan",
      };
  const style = {
    height: typeof size === "number" ? `${size}px` : size,
  } satisfies CSSProperties;

  if (variant === "lockup") {
    return (
      <LogoLockup
        accessibility={accessibility}
        className={classes}
        size={style.height}
        tile={tile}
        title={title}
        tone={tone}
        withTagline={withTagline}
      />
    );
  }

  return (
    <svg
      {...accessibility}
      className={classes}
      data-tone={tone}
      focusable="false"
      style={style}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!ariaHidden && <title>{title ?? "Ananthu Mohan"}</title>}
      {tile && (
        <rect
          className={styles.tile}
          width="512"
          height="512"
          rx="112"
        />
      )}
      <g className={styles.rings} fill="none" stroke="var(--logo-ink)">
        <g transform="rotate(-70 256 256)">
          <circle
            className={styles.ringOuter}
            cx="256"
            cy="256"
            r="180"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="760 371"
          />
        </g>
        <g transform="rotate(110 256 256)">
          <circle
            className={styles.ringMiddle}
            cx="256"
            cy="256"
            r="132"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="420 409"
          />
        </g>
        <g transform="rotate(200 256 256)">
          <circle
            className={styles.ringInner}
            cx="256"
            cy="256"
            r="86"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="300 240"
          />
        </g>
      </g>
      <circle cx="114" cy="145" r="12" fill="var(--logo-trail)" fillOpacity="0.6" />
      <circle cx="97" cy="171" r="8" fill="var(--logo-trail)" fillOpacity="0.35" />
      <circle cx="143" cy="116" r="17" fill="var(--logo-trail)" />
      <circle cx="379" cy="303" r="12" fill="var(--logo-ink)" />
      <circle cx="213" cy="330" r="10" fill="var(--logo-ink)" />
      <circle cx="256" cy="256" r="46" fill="var(--logo-eye)" />
      <circle className={styles.pupil} cx="249" cy="248" r="25" fill="var(--accent)" />
      <circle cx="241" cy="240" r="6" fill="var(--paper)" />
    </svg>
  );
}

export const Logo = memo(LogoComponent);
