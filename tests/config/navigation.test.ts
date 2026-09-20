import { describe, expect, it } from 'vitest';
import { footerNavigation, mainNavigation } from '@/lib/config/navigation';
import type { ExternalLink, ExternalLinkKey } from '@/lib/config/links';

/**
 * Die Regel, an der die zentrale Verlinkung hängt: Ein externes Ziel erscheint
 * genau dann, wenn es konfiguriert ist. Unkonfiguriert bedeutet unsichtbar —
 * nicht „Link ins Leere" und erst recht keine geratene URL.
 */

const youtubeOnly: Partial<Record<ExternalLinkKey, ExternalLink>> = {
  youtube: {
    key: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@United-Rails',
  },
};

function labelsOf(groups: ReturnType<typeof mainNavigation>, groupLabel: string) {
  return groups.find((group) => group.label === groupLabel)?.items?.map((item) => item.label) ?? [];
}

describe('Hauptnavigation', () => {
  it('lässt nicht konfigurierte externe Ziele weg', () => {
    const community = labelsOf(mainNavigation(youtubeOnly), 'Community');

    expect(community).toContain('YouTube');
    expect(community).not.toContain('Discord');
  });

  it('zeigt ein externes Ziel, sobald es konfiguriert ist', () => {
    const groups = mainNavigation({
      ...youtubeOnly,
      discord: { key: 'discord', label: 'Discord', url: 'https://discord.gg/beispiel' },
    });

    expect(labelsOf(groups, 'Community')).toContain('Discord');
  });

  it('enthält ohne jede Konfiguration nur interne Ziele', () => {
    const groups = mainNavigation({});
    const external = groups.flatMap((group) => group.items ?? []).filter((item) => item.external);

    expect(external).toHaveLength(0);
  });

  it('führt die von der Vorgabe verlangten Hauptpunkte', () => {
    const labels = mainNavigation({}).map((group) => group.label);

    expect(labels).toEqual([
      'Home',
      'Projekt',
      'Server',
      'Galerie',
      'Über uns',
      'Community',
      'Downloads',
      'Mitmachen',
    ]);
  });
});

describe('Fußbereich', () => {
  it('zeigt Impressum und Datenschutz immer', () => {
    const labels = footerNavigation({}).rechtliches.map((item) => item.label);

    expect(labels).toEqual(['Impressum', 'Datenschutz']);
  });

  it('listet nur konfigurierte externe Ziele', () => {
    expect(footerNavigation({}).extern).toHaveLength(0);
    expect(footerNavigation(youtubeOnly).extern.map((item) => item.label)).toEqual(['YouTube']);
  });
});
