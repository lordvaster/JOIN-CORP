type CoverImageProps = {
  src: string | null;
  alt: string;
  className?: string;
};

/**
 * Gambar sampul dari URL yang diisi admin (portfolio/blog). Pakai <img>
 * biasa (bukan next/image) karena URL-nya bebas dari domain manapun —
 * menghindari perlu mengizinkan remotePatterns wildcard di next.config.
 */
export function CoverImage({ src, alt, className }: CoverImageProps) {
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`aspect-video w-full rounded-xl object-cover ${className ?? ""}`}
    />
  );
}
