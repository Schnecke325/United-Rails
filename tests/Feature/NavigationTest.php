<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Support\ExternalLinks;
use App\Support\Navigation;
use Tests\TestCase;

/**
 * Die Regel, an der die zentrale Verlinkung hängt: Ein externes Ziel erscheint
 * genau dann, wenn es konfiguriert ist. Unkonfiguriert bedeutet unsichtbar,
 * nicht "Link ins Leere" und erst recht keine geratene URL.
 */
final class NavigationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withLinks([]);
    }

    /** @param  array<string, string>  $links */
    private function withLinks(array $links): void
    {
        config(['site.links' => array_merge(array_fill_keys(ExternalLinks::KEYS, null), $links)]);
        ExternalLinks::flush();
    }

    /** @return list<string> */
    private function itemLabels(string $groupLabel): array
    {
        foreach (Navigation::main() as $group) {
            if ($group['label'] === $groupLabel) {
                return array_column($group['items'] ?? [], 'label');
            }
        }

        return [];
    }

    public function test_hauptnavigation_laesst_nicht_konfigurierte_externe_ziele_weg(): void
    {
        $this->withLinks(['youtube' => 'https://www.youtube.com/@United-Rails']);

        $community = $this->itemLabels('Community');

        $this->assertContains('YouTube', $community);
        $this->assertNotContains('Discord', $community);
    }

    public function test_hauptnavigation_zeigt_ein_externes_ziel_sobald_es_konfiguriert_ist(): void
    {
        $this->withLinks([
            'youtube' => 'https://www.youtube.com/@United-Rails',
            'discord' => 'https://discord.gg/beispiel',
        ]);

        $this->assertContains('Discord', $this->itemLabels('Community'));
    }

    public function test_hauptnavigation_enthaelt_ohne_konfiguration_nur_interne_ziele(): void
    {
        $external = [];

        foreach (Navigation::main() as $group) {
            foreach ($group['items'] ?? [] as $item) {
                if (! empty($item['external'])) {
                    $external[] = $item['label'];
                }
            }
        }

        $this->assertSame([], $external);
    }

    public function test_hauptnavigation_fuehrt_die_von_der_vorgabe_verlangten_hauptpunkte(): void
    {
        $this->assertSame(
            ['Home', 'Projekt', 'Server', 'Galerie', 'Über uns', 'Community', 'Downloads', 'Mitmachen'],
            array_column(Navigation::main(), 'label'),
        );
    }

    public function test_fussbereich_zeigt_impressum_und_datenschutz_immer(): void
    {
        $this->assertSame(
            ['Impressum', 'Datenschutz'],
            array_column(Navigation::footer()['rechtliches'], 'label'),
        );
    }

    public function test_fussbereich_listet_nur_konfigurierte_externe_ziele(): void
    {
        $this->assertSame([], Navigation::footer()['extern']);

        $this->withLinks(['youtube' => 'https://www.youtube.com/@United-Rails']);

        $this->assertSame(
            ['YouTube'],
            array_column(Navigation::footer()['extern'], 'label'),
        );
    }

    public function test_eine_leere_url_erscheint_nirgends_im_ausgelieferten_html(): void
    {
        $this->withLinks(['youtube' => 'https://www.youtube.com/@United-Rails']);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('https://www.youtube.com/@United-Rails', escape: false);
        $response->assertDontSee('discord.gg');
        $response->assertDontSee('curseforge');
        $response->assertDontSee('modrinth');
    }
}
