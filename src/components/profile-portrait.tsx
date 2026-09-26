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
};

/** Preserved portrait with restrained framing; the caller's class sets its width. */
export function ProfilePortrait({
  src = "/image-themisson.jpeg",
  alt = "Themisson dos Santos Vasconcelos em retrato profissional",
  caption,
  priority = false,
  className = "",
  sizes = "(max-width: 47.99rem) 6.5rem, 13rem",
}: ProfilePortraitProps) {
  const { locale } = useLocale();

  return (
    <figure className={`profile-portrait-shell ${className}`.trim()}>
      <div className="profile-portrait-frame">
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
