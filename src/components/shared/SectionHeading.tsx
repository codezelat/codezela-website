import { MotionReveal } from "./MotionReveal";

type SectionHeadingProps = {
  title: string;
  description: string;
  inverse?: boolean;
  titleId?: string;
};

export function SectionHeading({ title, description, inverse = false, titleId }: SectionHeadingProps) {
  return (
    <MotionReveal>
      <header>
        <h2 id={titleId} className={`section-heading ${inverse ? "!text-white" : ""}`}>{title}</h2>
        <p className={`section-description ${inverse ? "!text-white" : ""}`}>{description}</p>
      </header>
    </MotionReveal>
  );
}
