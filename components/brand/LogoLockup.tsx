"use client";

import { memo, type CSSProperties } from "react";
import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo";

type LogoLockupProps = Pick<
  LogoProps,
  "className" | "size" | "tile" | "title" | "tone" | "withTagline"
> & {
  accessibility: { "aria-hidden": true } | { role: "img"; "aria-label": string };
};

function LogoLockupComponent({
  accessibility,
  className,
  size,
  tile = false,
  title,
  tone = "auto",
  withTagline = true,
}: LogoLockupProps) {
  const style = {
    height: typeof size === "number" ? `${size}px` : size,
  } satisfies CSSProperties;

  return (
    <svg
      {...accessibility}
      className={className}
      data-tone={tone}
      focusable="false"
      style={style}
      viewBox="0 0 1370 360"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!("aria-hidden" in accessibility) && (
        <title>{title ?? "Ananthu Mohan"}</title>
      )}
      {tile && (
        <rect
          className={styles.tile}
          width="1370"
          height="360"
          rx="48"
        />
      )}
      <g transform="translate(46 46) scale(0.5625)">
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
      </g>
      <g fill="var(--logo-ink)">
        <path transform="translate(380.00 196) scale(0.04492 -0.04492)" d="M49 0H386L497 346H1026L1141 0H1480L958 1490H558ZM573 585 616 719C661 869 705 1046 755 1251C807 1048 854 872 902 719L947 585Z" />
        <path transform="translate(453.29 196) scale(0.04492 -0.04492)" d="M135 0H447V685C447 773 438 933 427 1113C519 927 574 818 657 684L1085 0H1426V1490H1114V775C1114 677 1122 517 1133 371C1068 526 1005 639 946 736L475 1490H135Z" />
        <path transform="translate(528.01 196) scale(0.04492 -0.04492)" d="M49 0H386L497 346H1026L1141 0H1480L958 1490H558ZM573 585 616 719C661 869 705 1046 755 1251C807 1048 854 872 902 719L947 585Z" />
        <path transform="translate(601.29 196) scale(0.04492 -0.04492)" d="M135 0H447V685C447 773 438 933 427 1113C519 927 574 818 657 684L1085 0H1426V1490H1114V775C1114 677 1122 517 1133 371C1068 526 1005 639 946 736L475 1490H135Z" />
        <path transform="translate(676.02 196) scale(0.04492 -0.04492)" d="M75 1237H531V0H837V1237H1292V1490H75Z" />
        <path transform="translate(742.03 196) scale(0.04492 -0.04492)" d="M135 0H440V635H1089V0H1395V1490H1089V888H440V1490H135Z" />
        <path transform="translate(815.36 196) scale(0.04492 -0.04492)" d="M750 -21C1118 -21 1365 197 1365 523V1490H1059V548C1059 374 937 249 750 249C563 249 440 374 440 548V1490H135V523C135 197 379 -21 750 -21Z" />
        <path transform="translate(913.68 196) scale(0.04492 -0.04492)" d="M135 0H438V703C438 815 430 1034 427 1215C480 1015 540 806 575 703L826 0H1083L1330 703C1365 809 1428 1026 1478 1227C1475 1039 1467 815 1467 703V0H1774V1490H1304L1066 806C1036 711 990 512 956 351C921 513 875 712 845 806L603 1490H135Z" />
        <path transform="translate(1003.99 196) scale(0.04492 -0.04492)" d="M789 -20C1184 -20 1484 259 1484 744C1484 1231 1184 1510 789 1510C394 1510 94 1231 94 744C94 260 394 -20 789 -20ZM789 251C558 251 404 425 404 744C404 1064 558 1239 789 1239C1020 1239 1174 1065 1174 744C1174 425 1020 251 789 251Z" />
        <path transform="translate(1079.48 196) scale(0.04492 -0.04492)" d="M135 0H440V635H1089V0H1395V1490H1089V888H440V1490H135Z" />
        <path transform="translate(1152.81 196) scale(0.04492 -0.04492)" d="M49 0H386L497 346H1026L1141 0H1480L958 1490H558ZM573 585 616 719C661 869 705 1046 755 1251C807 1048 854 872 902 719L947 585Z" />
        <path transform="translate(1226.09 196) scale(0.04492 -0.04492)" d="M135 0H447V685C447 773 438 933 427 1113C519 927 574 818 657 684L1085 0H1426V1490H1114V775C1114 677 1122 517 1133 371C1068 526 1005 639 946 736L475 1490H135Z" />
      </g>
      <rect
        x="384"
        y="100"
        width="64"
        height="8"
        rx="4"
        fill="var(--logo-accent)"
      />
      {withTagline && (
        <text
          x="384"
          y="258"
          fill="var(--logo-tag)"
          fontFamily="Arial, sans-serif"
          fontSize="20"
          fontWeight="600"
          letterSpacing="1.5"
        >
          SOFTWARE ENGINEER
        </text>
      )}
    </svg>
  );
}

export const LogoLockup = memo(LogoLockupComponent);
