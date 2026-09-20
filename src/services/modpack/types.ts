/** Modpack-Releases. Dateien liegen später beim Storage-Anbieter, nicht im Repository. */

export type ModpackLoader = 'Forge' | 'NeoForge' | 'Fabric' | 'Quilt';

export type ModpackFileView = {
  id: string;
  label: string;
  /** Vom StorageService erzeugte URL. */
  url: string;
  sizeBytes?: number;
};

export type ModpackVersionView = {
  id: string;
  version: string;
  minecraftVersion: string;
  loader: ModpackLoader;
  loaderVersion?: string;
  releasedAt: Date;
  /** Änderungsliste als einfache Punkte, gepflegt über das Admin-Dashboard. */
  changelog: string[];
  files: ModpackFileView[];
  isCurrent: boolean;
};
