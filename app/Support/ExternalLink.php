<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Ein konfiguriertes externes Ziel.
 *
 * Objekte dieser Art entstehen nur für URLs, die tatsächlich gesetzt sind.
 * Was nicht konfiguriert ist, existiert hier gar nicht erst.
 */
final readonly class ExternalLink
{
    public function __construct(
        public string $key,
        public string $label,
        public string $url,
    ) {}
}
