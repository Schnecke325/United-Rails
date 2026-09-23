<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\ServerStatus\ServerStatusService;
use App\Support\Features;
use Tests\TestCase;

/**
 * Die Hosting-Entscheidungen, die im Betrieb wehtun, wenn sie kippen:
 * kein Anbietername im Code, Sitzungen und Cache nicht in der externen
 * Datenbank, Dateien nicht auf dem Webspace.
 */
final class ConfigurationTest extends TestCase
{
    /** Liest eine Einstellung so, wie sie .env.example für den Betrieb vorgibt. */
    private function envExample(string $key): ?string
    {
        foreach (file(base_path('.env.example'), FILE_IGNORE_NEW_LINES) as $line) {
            if (str_starts_with($line, $key.'=')) {
                return trim(substr($line, strlen($key) + 1));
            }
        }

        return null;
    }

    public function test_die_datenbank_ist_auf_mysql_voreingestellt(): void
    {
        // Im Test läuft SQLite im Arbeitsspeicher, deshalb zählt hier, was
        // .env.example für den Betrieb vorgibt.
        $this->assertSame('mysql', $this->envExample('DB_CONNECTION'));
        $this->assertNotNull(config('database.connections.mysql'));
    }

    public function test_die_datenbank_hat_keine_zugangsdaten_im_code(): void
    {
        foreach (['DB_HOST', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD', 'DB_SSL_CA'] as $key) {
            $this->assertSame('', $this->envExample($key), "$key darf in .env.example leer sein.");
        }
    }

    public function test_die_s3_platte_nennt_keinen_anbieter_im_code(): void
    {
        $disk = config('filesystems.disks.s3');

        foreach (['endpoint', 'url', 'bucket', 'key', 'secret'] as $schluessel) {
            $this->assertTrue(
                blank($disk[$schluessel] ?? null),
                "Die Einstellung $schluessel darf keinen Vorgabewert im Code haben.",
            );
        }

        // "auto" nennt keinen Anbieter und keine Region, es überlässt sie ihm.
        $this->assertSame('auto', $disk['region']);
    }

    public function test_sitzungen_und_cache_liegen_nicht_in_der_externen_datenbank(): void
    {
        // In der Testumgebung überschreibt phpunit.xml beides. Geprüft wird die
        // Vorgabe für den Betrieb, so wie sie auf dem Webspace greift.
        $this->assertSame('file', $this->envExample('SESSION_DRIVER'));
        $this->assertSame('file', $this->envExample('CACHE_STORE'));

        // Auch ohne gesetzte Umgebung darf keins von beidem in der Datenbank landen.
        $this->assertStringContainsString(
            "env('SESSION_DRIVER', 'file')",
            file_get_contents(config_path('session.php')),
        );
        $this->assertStringContainsString(
            "env('CACHE_STORE', 'file')",
            file_get_contents(config_path('cache.php')),
        );
    }

    public function test_ohne_konfiguration_ist_keine_funktion_eingeschaltet(): void
    {
        config([
            'site.crn.base_url' => null,
            'site.server_status.url' => null,
            'services.discord.client_id' => null,
            'services.discord.client_secret' => null,
            'filesystems.default' => 'local',
        ]);

        $this->assertFalse(Features::crnApi());
        $this->assertFalse(Features::serverStatus());
        $this->assertFalse(Features::discordLogin());
        $this->assertFalse(Features::remoteStorage());
    }

    public function test_der_serverstatus_liefert_ohne_quelle_keine_zahlen(): void
    {
        config(['site.server_status.url' => null]);

        $status = app(ServerStatusService::class)->current();

        $this->assertTrue($status->isUnknown());
        $this->assertSame('not-configured', $status->reason);
        $this->assertNull($status->players);
    }
}
