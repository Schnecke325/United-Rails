<?php

declare(strict_types=1);

namespace App\Data;

use App\Enums\ModpackLoader;
use DateTimeImmutable;

/** Modpack-Release. Dateien liegen beim Speicheranbieter, nicht im Repository. */
final readonly class ModpackVersionView
{
    /**
     * @param  list<string>  $changelog  Änderungsliste als einfache Punkte, gepflegt im Admin-Dashboard.
     * @param  list<ModpackFileView>  $files
     */
    public function __construct(
        public string $id,
        public string $version,
        public string $minecraftVersion,
        public ModpackLoader $loader,
        public DateTimeImmutable $releasedAt,
        public array $changelog,
        public array $files,
        public bool $isCurrent,
        public ?string $loaderVersion = null,
    ) {}

    /** Loader mit Version, wenn eine hinterlegt ist. */
    public function loaderLabel(): string
    {
        return $this->loaderVersion !== null
            ? $this->loader->value.' '.$this->loaderVersion
            : $this->loader->value;
    }
}
