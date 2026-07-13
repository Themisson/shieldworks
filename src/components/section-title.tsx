type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionTitle({ eyebrow, title, description, align = "left", as: Heading = "h1" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-petroleum-700">{eyebrow}</p> : null}
      <Heading className="mt-3 text-3xl font-semibold tracking-normal text-graphite-900 sm:text-4xl">{title}</Heading>
      {description ? <p className="mt-4 text-base leading-7 text-graphite-600">{description}</p> : null}
    </div>
  );
}
