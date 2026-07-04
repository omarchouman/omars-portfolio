import Image from "next/image";

type CoverImageProps = {
  src?: string;
  alt: string;
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Renders a post's cover photo, or a branded gradient placeholder when none is set. */
export function CoverImage({
  src,
  alt,
  aspectClassName = "aspect-[16/9]",
  sizes = "100vw",
  priority = false,
  className = "",
}: CoverImageProps) {
  if (!src) {
    return (
      <div className={`relative overflow-hidden ${aspectClassName} ${className}`}>
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-glow)" }} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectClassName} ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}
