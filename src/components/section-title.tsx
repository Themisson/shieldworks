type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-petroleum-700">{eyebrow}</p> : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-normal text-graphite-900 sm:text-4xl">{title}</h1>
      {description ? <p className="mt-4 text-base leading-7 text-graphite-600">{description}</p> : null}
    </div>
  );
}
