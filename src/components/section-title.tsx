type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h1",
  className = ""
}: SectionTitleProps) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`.trim()}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading
        className={`${eyebrow ? "mt-3" : ""} text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]`}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 max-w-[60ch] text-base leading-7 text-graphite-600">{description}</p>
      ) : null}
    </div>
  );
}
