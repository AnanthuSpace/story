import type { SVGProps } from "react";

type DotMatrixProps = SVGProps<SVGSVGElement> & {
  columns?: number;
  rows?: number;
  color?: "burgundy" | "cream" | "sage";
};

export function DotMatrix({
  columns = 13,
  rows = 9,
  color = "burgundy",
  ...props
}: DotMatrixProps) {
  const dots = Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return (
      <circle
        key={`${column}-${row}`}
        cx={16 + column * 24}
        cy={16 + row * 24}
        r="1.6"
      />
    );
  });

  return (
    <svg
      viewBox={`0 0 ${32 + (columns - 1) * 24} ${32 + (rows - 1) * 24}`}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g fill={`var(--${color})`}>{dots}</g>
    </svg>
  );
}
