"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import styles from "./DropCard.module.css";
import { DROP_SHAPES, type DropSatellite, type DropShapeVariant } from "./dropShapes";

export type DropTheme = "ice" | "obsidian";

export const DROP_THEME: DropTheme = "ice";

type DropCardProps = {
  children: ReactNode;
  className?: string;
  state?: "success" | "error" | null;
  theme?: DropTheme;
};

type SatelliteStyle = CSSProperties & {
  "--fly-x": string;
  "--fly-y": string;
  "--fly-delay": string;
};

const viewBox = "0 0 800 900";

function renderShapes(
  variants: readonly DropShapeVariant[],
  satellites: readonly DropSatellite[],
  isMobile: boolean,
  driftX: MotionValue<number>,
  driftY: MotionValue<number>,
) {
  return (
    <svg
      className={isMobile ? styles.mobileSvg : styles.desktopSvg}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {variants.map(({ id, path }) => (
        <path
          className={`${styles.shape} ${styles.depth} ${styles[`variant${id.toUpperCase()}`]}`}
          d={path}
          transform="translate(10 14)"
          key={`depth-${id}`}
        />
      ))}
      {variants.map(({ id, path }) => (
        <path
          className={`${styles.shape} ${styles.front} ${styles[`variant${id.toUpperCase()}`]}`}
          d={path}
          key={`front-${id}`}
        />
      ))}
      <motion.g style={{ x: driftX, y: driftY }}>
        {satellites.map((satellite, index) => {
          const style: SatelliteStyle = {
            "--fly-x": `${400 - satellite.x}px`,
            "--fly-y": `${450 - satellite.y}px`,
            "--fly-delay": `${index * 0.04}s`,
          };

          return (
            <circle
              className={`${styles.droplet} ${satellite.opposite ? styles.oppositeDroplet : ""}`}
              cx={satellite.x}
              cy={satellite.y}
              r={satellite.radius}
              style={style}
              key={`${isMobile ? "mobile" : "desktop"}-${index}`}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}

function DropCardComponent({
  children,
  className,
  state = null,
  theme = DROP_THEME,
}: DropCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerRectRef = useRef<DOMRect | null>(null);
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const springX = useSpring(driftX, { stiffness: 120, damping: 20 });
  const springY = useSpring(driftY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let isInView = false;
    let isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let fallbackTimer: number | undefined;

    const syncActivity = () => {
      const active = isInView && !document.hidden && !isReducedMotion;
      wrapper.dataset.active = String(active);

      if (isReducedMotion) {
        wrapper.dataset.entered = "true";
        wrapper.dataset.entering = "false";
        wrapper.dataset.visible = "true";
      } else if (active && wrapper.dataset.entered !== "true") {
        wrapper.dataset.visible = "true";
        wrapper.dataset.entering = "true";
      }
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              isInView = Boolean(
                entry?.isIntersecting && entry.intersectionRatio >= 0.2,
              );
              syncActivity();
            },
            { threshold: [0, 0.2] },
          );

    if (observer) {
      observer.observe(wrapper);
    } else {
      fallbackTimer = window.setTimeout(() => {
        isInView = true;
        syncActivity();
      }, 1500);
    }

    const handleVisibilityChange = () => syncActivity();
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const handleMotionChange = (event: MediaQueryListEvent) => {
      isReducedMotion = event.matches;
      syncActivity();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      observer?.disconnect();
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (
      !wrapper ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let scrollFrame = 0;
    const cacheRect = () => {
      pointerRectRef.current = wrapper.getBoundingClientRect();
    };
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        cacheRect();
        scrollFrame = 0;
      });
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (
        event.pointerType === "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        driftX.set(0);
        driftY.set(0);
        return;
      }
      const rect = pointerRectRef.current;
      if (!rect) return;

      const nearestX = Math.min(Math.max(event.clientX, rect.left), rect.right);
      const nearestY = Math.min(Math.max(event.clientY, rect.top), rect.bottom);
      const edgeDistance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);
      if (edgeDistance > 240) {
        driftX.set(0);
        driftY.set(0);
        return;
      }

      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const repel = Math.min(6, ((240 - edgeDistance) / 240) * 6);
      const direction = distance > 0 ? repel / distance : 0;
      driftX.set(-dx * direction);
      driftY.set(-dy * direction);
    };
    const handlePointerLeave = () => {
      driftX.set(0);
      driftY.set(0);
    };
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(cacheRect);

    cacheRect();
    resizeObserver?.observe(wrapper);
    window.addEventListener("resize", cacheRect, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", cacheRect);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      pointerRectRef.current = null;
      driftX.set(0);
      driftY.set(0);
    };
  }, [driftX, driftY]);

  const handleAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        wrapper.dataset.entering = "false";
        wrapper.dataset.entered = "true";
      }
    },
    [],
  );

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper}${className ? ` ${className}` : ""}`}
      data-theme={theme}
      data-active="false"
      data-entering="false"
      data-entered="false"
      data-state={state ?? "idle"}
    >
      <div
        className={styles.blob}
        onAnimationEnd={handleAnimationEnd}
        aria-hidden="true"
      >
        <div className={styles.shapeMotion}>
          {renderShapes(
            DROP_SHAPES.desktop,
            DROP_SHAPES.desktopSatellites,
            false,
            springX,
            springY,
          )}
          {renderShapes(
            DROP_SHAPES.mobile,
            DROP_SHAPES.mobileSatellites,
            true,
            springX,
            springY,
          )}
        </div>
        <div className={styles.ripples}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export const DropCard = memo(DropCardComponent);
