<?php

declare(strict_types=1);

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * Jede öffentliche Adresse muss erreichbar sein und ihren Rahmen mitbringen.
 * Die Adressen sind dieselben wie vor der Umstellung; dieser Test hält das fest.
 */
final class PublicPagesTest extends TestCase
{
    /** @return list<array{string, string}> */
    public static function seiten(): array
    {
        return [
            ['/', 'United Rails e.V.'],
            ['/projekt', 'Das Eisenbahnprojekt'],
            ['/projekt/historie', 'Historie'],
            ['/ueber-uns', 'Verein, Projekt und Community'],
            ['/ueber-uns/team', 'Das Team'],
            ['/server', 'Das Netz'],
            ['/server/karte', 'Netzkarte'],
            ['/server/navigator', 'Verbindungssuche'],
            ['/galerie', 'Bilder aus dem Netz'],
            ['/galerie/upload', 'Bild einreichen'],
            ['/downloads', 'Modpack'],
            ['/mitmachen/builder', 'Builder werden'],
            ['/mitmachen/mitgliedschaft', 'Mitglied werden'],
            ['/community', 'Discord und YouTube'],
            ['/impressum', 'Impressum'],
            ['/datenschutz', 'Datenschutz'],
        ];
    }

    #[DataProvider('seiten')]
    public function test_seite_ist_erreichbar(string $uri, string $ueberschrift): void
    {
        $response = $this->get($uri);

        $response->assertOk();
        $response->assertSee($ueberschrift, escape: false);
        $response->assertSee('Zum Inhalt springen');
        $response->assertSee('Hauptnavigation', escape: false);
    }

    public function test_unbekannte_adresse_zeigt_die_eigene_fehlerseite(): void
    {
        $response = $this->get('/gibt-es-nicht');

        $response->assertNotFound();
        $response->assertSee('Diese Strecke wurde nicht gefunden.');
    }

    public function test_upload_seite_wird_nicht_indexiert(): void
    {
        $this->get('/galerie/upload')->assertSee('noindex, follow', escape: false);
    }

    public function test_startseite_erfindet_keine_spielerzahlen(): void
    {
        $response = $this->get('/');

        $response->assertSee('Keine Daten');
        $response->assertSee('SERVER_STATUS_API_URL');
        $response->assertSee('Noch nicht hinterlegt (SERVER_URL)');
    }
}
