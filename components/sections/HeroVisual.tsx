import { ArcComposition } from "@/components/graphics/ArcComposition";
import { DotMatrix } from "@/components/graphics/DotMatrix";
import styles from "./HeroVisual.module.css";

export type HeroVisualProps = {
  className?: string;
};

export function HeroVisual({ className }: HeroVisualProps) {
  return (
    <div className={className ?? styles.visual} aria-hidden="true">
      <ArcComposition className={styles.arcs} />
      <DotMatrix className={styles.dots} columns={9} rows={7} />
      <svg className={styles.badge} viewBox="0 0 120 120">
        <defs>
          <path
            id="hero-badge-path"
            d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
          />
        </defs>
        <text>
          <textPath href="#hero-badge-path">SCROLL · EXPLORE · SCROLL · EXPLORE ·</textPath>
        </text>
        <path d="M60 47v26m-9-9 9 9 9-9" />
      </svg>
      <span className={`${styles.figure} eyebrow`}>FIG. 01</span>
      <span className={`${styles.dimension} eyebrow`}>← 360 →</span>
    </div>
  );
}
