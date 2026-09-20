import Image from 'next/image';
import Link from 'next/link';
import { categoryLabel, type GalleryImageView } from '@/services/gallery/types';
import { cn } from '@/lib/utils/cn';

/**
 * Masonry-Raster im Pinterest-Stil.
 *
 * Umgesetzt mit CSS-Columns: Bilder behalten ihre Höhe, das Raster bricht
 * sauber von vier Spalten auf eine herunter und braucht kein JavaScript.
 */
export function MasonryGrid({
  images,
  className,
}: {
  images: GalleryImageView[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>li]:mb-4',
        className,
      )}
    >
      {images.map((image) => (
        <li key={image.id} className="break-inside-avoid">
          <MasonryItem image={image} />
        </li>
      ))}
    </ul>
  );
}

function MasonryItem({ image }: { image: GalleryImageView }) {
  return (
    <Link
      href={`/galerie/${image.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-[var(--radius-md)]',
        'border border-[var(--border-subtle)] bg-[var(--surface-2)]',
        'transition-colors duration-[var(--duration-base)] hover:border-[var(--border-strong)]',
      )}
    >
      <Image
        src={image.thumbnailUrl ?? image.url}
        alt={image.title}
        width={image.width}
        height={image.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        loading="lazy"
        className="w-full"
      />

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(15,28,38,0.92)] to-transparent p-4',
          'opacity-0 transition-opacity duration-[var(--duration-base)]',
          'group-hover:opacity-100 group-focus-visible:opacity-100',
        )}
      >
        <p className="font-medium text-[#ffffff]">{image.title}</p>
        <p className="ur-display mt-1 text-xs uppercase text-[#d6dee5]">
          {image.categories.map(categoryLabel).join(' · ')}
        </p>
      </div>
    </Link>
  );
}
