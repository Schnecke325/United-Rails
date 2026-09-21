<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Externe Ziele zentral aufgelöst.
 *
 * Alle URLs stammen aus der Umgebung, nirgendwo aus dem Quelltext. Was nicht
 * konfiguriert ist, fehlt hier. Die Oberfläche blendet solche Links aus,
 * statt ins Leere zu verlinken oder eine URL zu erfinden.
 */
final class ExternalLinks
{
    public const KEYS = ['discord', 'youtube', 'curseforge', 'modrinth', 'gallery', 'hoster'];

    /** @var array<string, ExternalLink>|null */
    private static ?array $cache = null;

    /**
     * Nur die tatsächlich konfigurierten externen Ziele.
     *
     * @return array<string, ExternalLink>
     */
    public static function all(): array
    {
        if (self::$cache !== null) {
            return self::$cache;
        }

        $labels = config('site.link_labels');
        $links = [];

        foreach (self::KEYS as $key) {
            $url = config("site.links.$key");

            if (! is_string($url) || trim($url) === '') {
                continue;
            }

            $links[$key] = new ExternalLink($key, (string) ($labels[$key] ?? $key), trim($url));
        }

        return self::$cache = $links;
    }

    /** Ein einzelnes Ziel, oder null wenn es nicht konfiguriert ist. */
    public static function get(string $key): ?ExternalLink
    {
        return self::all()[$key] ?? null;
    }

    public static function has(string $key): bool
    {
        return isset(self::all()[$key]);
    }

    /** Die Serveradresse zum Verbinden (kein Link, sondern Text zum Kopieren). */
    public static function serverAddress(): ?string
    {
        $address = config('site.server_address');

        return is_string($address) && trim($address) !== '' ? trim($address) : null;
    }

    /** Nur für Tests: erzwingt ein Neulesen der Konfiguration. */
    public static function flush(): void
    {
        self::$cache = null;
    }
}
