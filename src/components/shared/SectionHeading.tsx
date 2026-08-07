type SectionHeadingProps = {
  title: string;
  description: string;
  inverse?: boolean;
};

export function SectionHeading({ title, description, inverse = false }: SectionHeadingProps) {
  return (
    <header>
      <h2 className={`section-heading ${inverse ? "!text-white" : ""}`}>{title}</h2>
      <p className={`section-description ${inverse ? "!text-white" : ""}`}>{description}</p>
    </header>
  );
}
