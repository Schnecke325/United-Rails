<?php

declare(strict_types=1);

namespace App\Data;

/** Eine Datei eines Modpack-Releases. Die URL kommt vom Dateispeicher. */
final readonly class ModpackFileView
{
    public function __construct(
        public string $id,
        public string $label,
        public string $url,
        public ?int $sizeBytes = null,
    ) {}
}
