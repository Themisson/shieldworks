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

/**
 * Professional portrait with soft edge blending.
 * Uses feathered corner mask + ambient outer glow so the studio
 * background transitions gently into the page surface.
 */
export function ProfilePortrait({
  src = "/image-themisson.jpeg",
  alt = "Themisson dos Santos Vasconcelos em retrato profissional",
  caption,
  priority = false,
  className = "",
  sizes = "(max-width: 1023px) 100vw, 42vw",
  aspect = "portrait"
}: ProfilePortraitProps) {
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
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-[center_18%]"
          />
        </div>

        {/* Soft multi-axis edge fade into page tones */}
        <div className="profile-portrait-veil" aria-hidden="true" />

        {/* Inner light rim — soft, not a hard stroke */}
        <div className="profile-portrait-rim" aria-hidden="true" />

        {caption ? (
          <figcaption className="profile-portrait-caption">{caption}</figcaption>
        ) : null}
      </div>
    </figure>
  );
}
