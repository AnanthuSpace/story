import type { CSSProperties } from "react";

export function IndexNumeral({
  value,
  outlined = false,
  className,
}: {
  value: string;
  outlined?: boolean;
  className?: string;
}) {
  const style: CSSProperties = outlined
    ? {
        color: "transparent",
        WebkitTextStroke: "1px var(--burgundy)",
      }
    : { color: "var(--burgundy)" };

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        ...style,
        fontFamily: "var(--font-fraunces), Georgia, serif",
        fontSize: "clamp(4rem, 12vw, 11rem)",
        fontWeight: 450,
        letterSpacing: "-0.08em",
        lineHeight: 0.8,
      }}
    >
      {value}
    </span>
  );
}
