<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Navigationsstruktur.
 *
 * Interne Einträge stehen fest. Externe Einträge erscheinen nur, wenn die
 * zugehörige URL konfiguriert ist; sonst fällt der Eintrag weg.
 *
 * Aufbau eines Eintrags: label, href, external (bool), description (optional).
 * Eine Gruppe hat label, optional href und optional items.
 */
final class Navigation
{
    /**
     * Ein externer Eintrag, oder null wenn die URL fehlt.
     *
     * @return array{label: string, href: string, external: true, description?: string}|null
     */
    private static function externalItem(string $key, ?string $description = null): ?array
    {
        $link = ExternalLinks::get($key);

        if ($link === null) {
            return null;
        }

        $item = ['label' => $link->label, 'href' => $link->url, 'external' => true];

        if ($description !== null) {
            $item['description'] = $description;
        }

        return $item;
    }

    /**
     * @param  array<int, array<string, mixed>|null>  $items
     * @return list<array<string, mixed>>
     */
    private static function compact(array $items): array
    {
        return array_values(array_filter($items));
    }

    /**
     * Ist dieser Eintrag der aktuell geöffnete Bereich?
     *
     * Die Startseite gilt nur auf sich selbst als aktiv, alle anderen
     * Einträge auch auf ihren Unterseiten.
     */
    public static function isActive(?string $href): bool
    {
        if ($href === null) {
            return false;
        }

        $target = rtrim((string) parse_url($href, PHP_URL_PATH), '/');
        $current = rtrim('/'.request()->path(), '/');

        if ($target === '') {
            return $current === '';
        }

        return $current === $target || str_starts_with($current, $target.'/');
    }

    /** @return list<array<string, mixed>> */
    public static function main(): array
    {
        $community = self::compact([
            self::externalItem('discord', 'Austausch, Support und Ankündigungen'),
            self::externalItem('youtube', 'Videos zu Strecken, Fahrzeugen und Bauprojekten'),
            ['label' => 'Community-Überblick', 'href' => route('community')],
        ]);

        $downloads = self::compact([
            [
                'label' => 'Modpack',
                'href' => route('downloads'),
                'description' => 'Aktuelle Version und Archiv',
            ],
            self::externalItem('curseforge'),
            self::externalItem('modrinth'),
        ]);

        return [
            ['label' => 'Home', 'href' => route('home')],
            [
                'label' => 'Projekt',
                'href' => route('projekt'),
                'items' => [
                    ['label' => 'Das Projekt', 'href' => route('projekt')],
                    ['label' => 'Historie', 'href' => route('projekt.historie')],
                ],
            ],
            [
                'label' => 'Server',
                'href' => route('server'),
                'items' => [
                    ['label' => 'Überblick', 'href' => route('server')],
                    ['label' => 'Netzkarte', 'href' => route('server.karte')],
                    ['label' => 'Verbindungssuche', 'href' => route('server.navigator')],
                ],
            ],
            ['label' => 'Galerie', 'href' => route('galerie')],
            [
                'label' => 'Über uns',
                'href' => route('ueber-uns'),
                'items' => [
                    ['label' => 'Verein und Projekt', 'href' => route('ueber-uns')],
                    ['label' => 'Team', 'href' => route('ueber-uns.team')],
                ],
            ],
            ['label' => 'Community', 'href' => route('community'), 'items' => $community],
            ['label' => 'Downloads', 'href' => route('downloads'), 'items' => $downloads],
            [
                'label' => 'Mitmachen',
                'href' => route('mitmachen.builder'),
                'items' => [
                    [
                        'label' => 'Builder werden',
                        'href' => route('mitmachen.builder'),
                        'description' => 'Bewirb dich mit deinen Bauwerken',
                    ],
                    [
                        'label' => 'Mitglied werden',
                        'href' => route('mitmachen.mitgliedschaft'),
                        'description' => 'Interesse an der Vereinsmitgliedschaft',
                    ],
                ],
            ],
        ];
    }

    /** @return array<string, list<array<string, mixed>>> */
    public static function footer(): array
    {
        $externals = self::compact(array_map(
            static fn (string $key) => self::externalItem($key),
            ['discord', 'youtube', 'curseforge', 'modrinth'],
        ));

        return [
            'projekt' => [
                ['label' => 'Über uns', 'href' => route('ueber-uns')],
                ['label' => 'Projekt', 'href' => route('projekt')],
                ['label' => 'Historie', 'href' => route('projekt.historie')],
                ['label' => 'Team', 'href' => route('ueber-uns.team')],
            ],
            'plattform' => [
                ['label' => 'Server', 'href' => route('server')],
                ['label' => 'Netzkarte', 'href' => route('server.karte')],
                ['label' => 'Galerie', 'href' => route('galerie')],
                ['label' => 'Modpack', 'href' => route('downloads')],
            ],
            'mitmachen' => [
                ['label' => 'Builder werden', 'href' => route('mitmachen.builder')],
                ['label' => 'Mitglied werden', 'href' => route('mitmachen.mitgliedschaft')],
                ['label' => 'Bild einreichen', 'href' => route('galerie.upload')],
            ],
            'extern' => $externals,
            'rechtliches' => [
                ['label' => 'Impressum', 'href' => route('impressum')],
                ['label' => 'Datenschutz', 'href' => route('datenschutz')],
            ],
        ];
    }
}
