import { routes } from './site';
import type { ExternalLink, ExternalLinkKey } from './links';

/**
 * Navigationsstruktur.
 *
 * Interne Einträge stehen fest. Externe Einträge erscheinen nur, wenn die
 * zugehörige URL konfiguriert ist; sonst fällt der Eintrag weg.
 */

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items?: NavItem[];
};

type Links = Partial<Record<ExternalLinkKey, ExternalLink>>;

function externalItem(
  links: Links,
  key: ExternalLinkKey,
  description?: string,
): NavItem | undefined {
  const link = links[key];
  if (!link) return undefined;
  return { label: link.label, href: link.url, external: true, description };
}

export function mainNavigation(links: Links): NavGroup[] {
  const community: NavItem[] = [
    externalItem(links, 'discord', 'Austausch, Support und Ankündigungen'),
    externalItem(links, 'youtube', 'Videos zu Strecken, Fahrzeugen und Bauprojekten'),
    { label: 'Community-Überblick', href: routes.community },
  ].filter((item): item is NavItem => Boolean(item));

  const downloads: NavItem[] = [
    { label: 'Modpack', href: routes.downloads, description: 'Aktuelle Version und Archiv' },
    externalItem(links, 'curseforge'),
    externalItem(links, 'modrinth'),
  ].filter((item): item is NavItem => Boolean(item));

  return [
    { label: 'Home', href: routes.home },
    {
      label: 'Projekt',
      href: routes.projekt,
      items: [
        { label: 'Das Projekt', href: routes.projekt },
        { label: 'Historie', href: routes.historie },
      ],
    },
    {
      label: 'Server',
      href: routes.server,
      items: [
        { label: 'Überblick', href: routes.server },
        { label: 'Netzkarte', href: routes.serverKarte },
        { label: 'Verbindungssuche', href: routes.serverNavigator },
      ],
    },
    { label: 'Galerie', href: routes.galerie },
    {
      label: 'Über uns',
      href: routes.ueberUns,
      items: [
        { label: 'Verein und Projekt', href: routes.ueberUns },
        { label: 'Team', href: routes.team },
      ],
    },
    { label: 'Community', href: routes.community, items: community },
    { label: 'Downloads', href: routes.downloads, items: downloads },
    {
      label: 'Mitmachen',
      href: routes.builder,
      items: [
        {
          label: 'Builder werden',
          href: routes.builder,
          description: 'Bewirb dich mit deinen Bauwerken',
        },
        {
          label: 'Mitglied werden',
          href: routes.mitgliedschaft,
          description: 'Interesse an der Vereinsmitgliedschaft',
        },
      ],
    },
  ];
}

export function footerNavigation(links: Links) {
  const externals = (['discord', 'youtube', 'curseforge', 'modrinth'] as const)
    .map((key) => externalItem(links, key))
    .filter((item): item is NavItem => Boolean(item));

  return {
    projekt: [
      { label: 'Über uns', href: routes.ueberUns },
      { label: 'Projekt', href: routes.projekt },
      { label: 'Historie', href: routes.historie },
      { label: 'Team', href: routes.team },
    ] satisfies NavItem[],
    plattform: [
      { label: 'Server', href: routes.server },
      { label: 'Netzkarte', href: routes.serverKarte },
      { label: 'Galerie', href: routes.galerie },
      { label: 'Modpack', href: routes.downloads },
    ] satisfies NavItem[],
    mitmachen: [
      { label: 'Builder werden', href: routes.builder },
      { label: 'Mitglied werden', href: routes.mitgliedschaft },
      { label: 'Bild einreichen', href: routes.galerieUpload },
    ] satisfies NavItem[],
    extern: externals,
    rechtliches: [
      { label: 'Impressum', href: routes.impressum },
      { label: 'Datenschutz', href: routes.datenschutz },
    ] satisfies NavItem[],
  };
}
