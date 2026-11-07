const defaultLines = [
  "const build = async (idea: Product) => {",
  "  const system = await compose(idea);",
  "  return system.ship({ quality: true });",
  "};",
];

export function CodeFragment({
  lines = defaultLines,
  className,
}: {
  lines?: string[];
  className?: string;
}) {
  return (
    <pre
      className={className}
      aria-hidden="true"
      style={{
        color: "var(--burgundy)",
        fontFamily: "var(--font-jetbrains-mono)",
        opacity: 0.34,
        whiteSpace: "pre",
      }}
    >
      <code>{lines.join("\n")}</code>
    </pre>
  );
}
