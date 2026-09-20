import 'server-only';
import { env } from './env';

/**
 * Externe Ziele zentral aufgelöst.
 *
 * Alle URLs stammen aus der Umgebung, nirgendwo aus dem Quelltext. Was nicht
 * konfiguriert ist, fehlt hier. Die Oberfläche blendet solche Links aus,
 * statt ins Leere zu verlinken oder eine URL zu erfinden.
 */

export type ExternalLinkKey =
  | 'discord'
  | 'youtube'
  | 'curseforge'
  | 'modrinth'
  | 'gallery'
  | 'hoster';

export type ExternalLink = {
  key: ExternalLinkKey;
  label: string;
  url: string;
};

const labels: Record<ExternalLinkKey, string> = {
  discord: 'Discord',
  youtube: 'YouTube',
  curseforge: 'CurseForge',
  modrinth: 'Modrinth',
  gallery: 'Galerie',
  hoster: 'Hoster',
};

/** Nur die tatsächlich konfigurierten externen Ziele, als einfache Objekte für den Client. */
export function externalLinks(): Partial<Record<ExternalLinkKey, ExternalLink>> {
  const e = env();
  const raw: Record<ExternalLinkKey, string | undefined> = {
    discord: e.DISCORD_URL,
    youtube: e.YOUTUBE_URL,
    curseforge: e.CURSEFORGE_URL,
    modrinth: e.MODRINTH_URL,
    gallery: e.GALLERY_URL,
    hoster: e.HOSTER_URL,
  };

  const result: Partial<Record<ExternalLinkKey, ExternalLink>> = {};
  for (const [key, url] of Object.entries(raw) as [ExternalLinkKey, string | undefined][]) {
    if (url) result[key] = { key, label: labels[key], url };
  }
  return result;
}

/** Die Serveradresse zum Verbinden (kein Link, sondern Text zum Kopieren). */
export function serverAddress(): string | undefined {
  return env().SERVER_URL;
}

/** Absolute URL auf Basis von SITE_URL, für Canonical-Tags und Open Graph. */
export function absoluteUrl(path = '/'): string {
  const base = env().SITE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}
