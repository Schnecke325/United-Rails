<?php

declare(strict_types=1);

namespace App\Services\ServerStatus;

/**
 * Anbindung an eine künftige Live-Status-Schnittstelle.
 *
 * TODO: Es steht noch nicht fest, woher der Status kommt (eigenes Plugin,
 * Query-Protokoll, Hoster-API). Sobald das feststeht, wird hier genau eine
 * Methode implementiert. Der Rest der Anwendung bleibt unverändert.
 *
 * Bis dahin liefert der Dienst bewusst "unknown" statt Beispielwerten.
 */
final class ServerStatusService
{
    public function current(): ServerStatus
    {
        $url = config('site.server_status.url');

        if (! is_string($url) || trim($url) === '') {
            return ServerStatus::unknown('not-configured');
        }

        // TODO: Antwortformat der künftigen Statusquelle abbilden und validieren.
        // Das Ergebnis gehört für config('site.server_status.cache_seconds')
        // Sekunden in den Cache, damit nicht jeder Seitenaufruf nach außen geht.
        return ServerStatus::unknown('not-configured');
    }
}
