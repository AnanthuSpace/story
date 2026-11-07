export function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <p className="eyebrow section-label">
      <span>({number})</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}
