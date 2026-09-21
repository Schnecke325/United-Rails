<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Was ist konfiguriert, was nicht.
 *
 * Steuert die Sichtbarkeit im Auftritt. Grundsatz: Was noch nicht feststeht,
 * bleibt leer und wird ausgeblendet oder als Platzhalter gekennzeichnet.
 * Es wird nichts erfunden.
 */
final class Features
{
    /** Externe Datenbank erreichbar konfiguriert. */
    public static function database(): bool
    {
        return self::filled(config('database.connections.mysql.host'))
            && self::filled(config('database.connections.mysql.database'));
    }

    /** Discord-Anmeldung vollständig konfiguriert. */
    public static function discordLogin(): bool
    {
        return self::filled(config('services.discord.client_id'))
            && self::filled(config('services.discord.client_secret'));
    }

    /** CRN-Anbindung konfiguriert. Ohne sie bleibt die Verbindungssuche ein Gerüst. */
    public static function crnApi(): bool
    {
        return self::filled(config('site.crn.base_url'));
    }

    /** Quelle für den Live-Serverstatus konfiguriert. */
    public static function serverStatus(): bool
    {
        return self::filled(config('site.server_status.url'));
    }

    /** Uploads liegen in einem externen Speicher statt auf dem Webspace. */
    public static function remoteStorage(): bool
    {
        return config('filesystems.default') === 's3';
    }

    private static function filled(mixed $value): bool
    {
        return is_string($value) && trim($value) !== '';
    }
}
