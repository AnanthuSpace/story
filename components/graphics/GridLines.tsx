import type { SVGProps } from "react";

type GridLinesProps = SVGProps<SVGSVGElement> & {
  columns?: number;
  rows?: number;
};

export function GridLines({
  columns = 8,
  rows = 6,
  ...props
}: GridLinesProps) {
  const verticalLines = Array.from({ length: columns + 1 }, (_, index) => {
    const x = (index / columns) * 720;
    return <line key={`v-${index}`} x1={x} y1="0" x2={x} y2="580" />;
  });
  const horizontalLines = Array.from({ length: rows + 1 }, (_, index) => {
    const y = (index / rows) * 580;
    return <line key={`h-${index}`} x1="0" y1={y} x2="720" y2={y} />;
  });

  return (
    <svg
      viewBox="0 0 720 580"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g stroke="var(--burgundy)" strokeOpacity="0.22" strokeWidth="1">
        {verticalLines}
        {horizontalLines}
      </g>
    </svg>
  );
}
