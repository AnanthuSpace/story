export function DimensionLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      aria-label={`Dimension ${label}`}
      style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--ink)" }}
    >
      ← {label} →
    </span>
  );
}
