/**
 * Galerie-Domänentypen.
 *
 * Kategorien sind bewusst eine feste Liste: Mitglieder wählen aus, sie legen
 * keine eigenen Schlagworte an. Ein Bild kann mehreren Kategorien angehören.
 */
export const GALLERY_CATEGORIES = [
  { slug: 'fahrzeuge', label: 'Fahrzeuge' },
  { slug: 'bauwerke', label: 'Bauwerke' },
  { slug: 'bahnhoefe', label: 'Bahnhöfe' },
  { slug: 'strecken', label: 'Strecken' },
  { slug: 'landschaft', label: 'Landschaft' },
  { slug: 'sonstiges', label: 'Sonstiges' },
] as const;

export type GalleryCategorySlug = (typeof GALLERY_CATEGORIES)[number]['slug'];

export const GALLERY_CATEGORY_SLUGS = GALLERY_CATEGORIES.map((c) => c.slug) as [
  GalleryCategorySlug,
  ...GalleryCategorySlug[],
];

export function categoryLabel(slug: string): string {
  return GALLERY_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

/** Moderationsstatus. Nichts wird ohne Freigabe öffentlich. */
export type GalleryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type GalleryImageView = {
  id: string;
  title: string;
  description?: string;
  /** URL des ausgelieferten Bildes, kommt aus dem StorageService. */
  url: string;
  thumbnailUrl?: string;
  width: number;
  height: number;
  categories: GalleryCategorySlug[];
  /** Minecraft-Name der einreichenden Person; Discord-Name bleibt intern. */
  minecraftName: string;
  createdAt: Date;
};
