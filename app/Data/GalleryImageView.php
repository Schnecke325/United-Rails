<?php

declare(strict_types=1);

namespace App\Data;

use App\Enums\GalleryCategory;
use DateTimeImmutable;

/**
 * Ein Galeriebild, wie es die Oberfläche braucht.
 *
 * Die URL erzeugt der Dateispeicher, nicht die Vorlage. Der Discord-Name der
 * einreichenden Person bleibt intern und steht hier bewusst nicht.
 */
final readonly class GalleryImageView
{
    /** @param  list<GalleryCategory>  $categories */
    public function __construct(
        public string $id,
        public string $title,
        public string $url,
        public int $width,
        public int $height,
        public array $categories,
        public string $minecraftName,
        public DateTimeImmutable $createdAt,
        public ?string $description = null,
        public ?string $thumbnailUrl = null,
    ) {}

    public function displayUrl(): string
    {
        return $this->thumbnailUrl ?? $this->url;
    }

    /** Kategorien als lesbare Liste, wie sie über dem Bild steht. */
    public function categoryLabels(): string
    {
        return implode(' · ', array_map(
            static fn (GalleryCategory $category) => $category->label(),
            $this->categories,
        ));
    }
}
