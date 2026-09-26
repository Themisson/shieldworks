"use client";
import { useLocale } from "@/i18n/locale-provider";
import Image from "next/image";
import type { ReactNode } from "react";

type ProfilePortraitProps = {
  src?: string;
  alt?: string;
  caption?: ReactNode;
  priority?: boolean;
  className?: string;
  sizes?: string;
  aspect?: "portrait" | "square";
};

/** Preserved portrait with restrained framing and a solid, readable caption. */
export function ProfilePortrait({
  src = "/image-themisson.jpeg",
  alt = "Themisson dos Santos Vasconcelos em retrato profissional",
  caption,
  priority = false,
  className = "",
  sizes = "(max-width: 1023px) 100vw, 42vw",
  aspect = "portrait",
}: ProfilePortraitProps) {
  const { locale } = useLocale();
  const minHeight =
    aspect === "square"
      ? "min-h-[320px] sm:min-h-[380px]"
      : "min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]";

  return (
    <figure className={`profile-portrait-shell ${className}`.trim()}>
      <div className={`profile-portrait-frame relative ${minHeight} w-full`}>
        <div className="profile-portrait-media absolute inset-0">
          <Image
            src={src}
            alt={
              alt ===
                "Themisson dos Santos Vasconcelos em retrato profissional" &&
              locale === "en"
                ? "Professional portrait of Themisson dos Santos Vasconcelos"
                : alt
            }
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-[center_18%]"
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="profile-portrait-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
