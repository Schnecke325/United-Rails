<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * Galerie-Kategorien.
 *
 * Bewusst eine feste Liste: Mitglieder wählen aus, sie legen keine eigenen
 * Schlagworte an. Ein Bild kann mehreren Kategorien angehören.
 */
enum GalleryCategory: string
{
    case Fahrzeuge = 'fahrzeuge';
    case Bauwerke = 'bauwerke';
    case Bahnhoefe = 'bahnhoefe';
    case Strecken = 'strecken';
    case Landschaft = 'landschaft';
    case Sonstiges = 'sonstiges';

    public function label(): string
    {
        return match ($this) {
            self::Fahrzeuge => 'Fahrzeuge',
            self::Bauwerke => 'Bauwerke',
            self::Bahnhoefe => 'Bahnhöfe',
            self::Strecken => 'Strecken',
            self::Landschaft => 'Landschaft',
            self::Sonstiges => 'Sonstiges',
        };
    }

    /** @return array<string, string> Slug zu Beschriftung, für Auswahlfelder. */
    public static function options(): array
    {
        $options = [];

        foreach (self::cases() as $case) {
            $options[$case->value] = $case->label();
        }

        return $options;
    }

    public static function labelFor(string $slug): string
    {
        return self::tryFrom($slug)?->label() ?? $slug;
    }
}
