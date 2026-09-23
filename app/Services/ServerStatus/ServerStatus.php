<?php

declare(strict_types=1);

namespace App\Services\ServerStatus;

use DateTimeImmutable;

/**
 * Serverstatus.
 *
 * "unknown" ist der ehrliche Normalfall, solange keine Datenquelle
 * konfiguriert ist. Die Oberfläche zeigt dann einen Platzhalter statt
 * erfundener Zahlen.
 */
final readonly class ServerStatus
{
    private function __construct(
        public string $kind,
        public ?int $players = null,
        public ?int $maxPlayers = null,
        public ?string $version = null,
        public ?DateTimeImmutable $checkedAt = null,
        public ?string $reason = null,
    ) {}

    public static function online(
        int $players,
        int $maxPlayers,
        ?string $version = null,
        ?DateTimeImmutable $checkedAt = null,
    ): self {
        return new self(
            kind: 'online',
            players: $players,
            maxPlayers: $maxPlayers,
            version: $version,
            checkedAt: $checkedAt ?? new DateTimeImmutable,
        );
    }

    public static function offline(?DateTimeImmutable $checkedAt = null): self
    {
        return new self(kind: 'offline', checkedAt: $checkedAt ?? new DateTimeImmutable);
    }

    /** @param  'not-configured'|'unreachable'  $reason */
    public static function unknown(string $reason): self
    {
        return new self(kind: 'unknown', reason: $reason);
    }

    public function isOnline(): bool
    {
        return $this->kind === 'online';
    }

    public function isOffline(): bool
    {
        return $this->kind === 'offline';
    }

    public function isUnknown(): bool
    {
        return $this->kind === 'unknown';
    }
}
