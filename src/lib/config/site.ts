/**
 * Statische Stammdaten der Seite.
 * Enthält bewusst keine erfundenen Vereinstexte, nur Struktur und Beschriftung.
 */

export const site = {
  name: 'United Rails e.V.',
  shortName: 'United Rails',
  tagline: 'Minecraft Railway Community',
  /** Kurzbeschreibung für Meta-Tags. Sachlich, kein erfundener Marketingtext. */
  description:
    'United Rails e.V. ist ein eingetragener Verein und eine Minecraft-Community rund um Eisenbahn, Streckenbau, Bahnhöfe und Fahrpläne.',
  locale: 'de-DE',
  themeColor: '#0d1114',
} as const;

/** Interne Routen an einer Stelle, damit Links nicht auseinanderlaufen. */
export const routes = {
  home: '/',
  projekt: '/projekt',
  historie: '/projekt/historie',
  ueberUns: '/ueber-uns',
  team: '/ueber-uns/team',
  server: '/server',
  serverKarte: '/server/karte',
  serverNavigator: '/server/navigator',
  galerie: '/galerie',
  galerieUpload: '/galerie/upload',
  downloads: '/downloads',
  builder: '/mitmachen/builder',
  mitgliedschaft: '/mitmachen/mitgliedschaft',
  community: '/community',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  admin: '/admin',
  login: '/login',
} as const;
