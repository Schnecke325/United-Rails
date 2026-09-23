<?php

declare(strict_types=1);

/**
 * Stammdaten, interne Routen und externe Ziele der Seite.
 *
 * Enthält bewusst keine erfundenen Vereinstexte, nur Struktur und Beschriftung.
 * Was noch nicht feststeht, bleibt leer. Die Oberfläche blendet solche Angaben
 * aus oder kennzeichnet sie als Platzhalter, statt etwas zu erfinden.
 */
return [

    'name' => 'United Rails e.V.',
    'short_name' => 'United Rails',
    'tagline' => 'Minecraft Railway Community',

    /** Kurzbeschreibung für Meta-Tags. Sachlich, kein erfundener Marketingtext. */
    'description' => 'United Rails e.V. ist ein eingetragener Verein und eine Minecraft-Community '
        .'rund um Eisenbahn, Streckenbau, Bahnhöfe und Fahrpläne.',

    'locale' => 'de-DE',
    'theme_color' => '#0d1114',

    /**
     * Externe Ziele. Ein leerer Wert bedeutet: Der Link erscheint nirgends im
     * Auftritt. Es wird nie ins Leere verlinkt und keine URL erfunden.
     */
    'links' => [
        'discord' => env('DISCORD_URL'),
        'youtube' => env('YOUTUBE_URL'),
        'curseforge' => env('CURSEFORGE_URL'),
        'modrinth' => env('MODRINTH_URL'),
        'gallery' => env('GALLERY_URL'),
        'hoster' => env('HOSTER_URL'),
    ],

    /** Beschriftung der externen Ziele. */
    'link_labels' => [
        'discord' => 'Discord',
        'youtube' => 'YouTube',
        'curseforge' => 'CurseForge',
        'modrinth' => 'Modrinth',
        'gallery' => 'Galerie',
        'hoster' => 'Hoster',
    ],

    /** Die Serveradresse zum Verbinden. Kein Link, sondern Text zum Kopieren. */
    'server_address' => env('SERVER_URL'),

    /**
     * Create Railway Navigator.
     * TODO: Die offizielle CRN-Dokumentation liegt noch nicht vor. Basis-URL und
     * Authentifizierung bleiben leer, bis sie da ist.
     */
    'crn' => [
        'base_url' => env('CRN_API_BASE_URL'),
        'key' => env('CRN_API_KEY'),
    ],

    /**
     * Quelle für den Live-Serverstatus.
     * TODO: Noch keine Datenquelle festgelegt. Solange leer, zeigt die Seite
     * ausdrücklich "keine Daten" statt erfundener Spielerzahlen.
     */
    'server_status' => [
        'url' => env('SERVER_STATUS_API_URL'),
        'cache_seconds' => (int) env('SERVER_STATUS_CACHE_SECONDS', 60),
    ],

    /** Obergrenzen für Uploads, in Megabyte. */
    'uploads' => [
        'max_file_size_mb' => (int) env('UPLOAD_MAX_FILE_SIZE_MB', 8),
        'max_files_per_application' => (int) env('UPLOAD_MAX_FILES_PER_APPLICATION', 8),
    ],

];
