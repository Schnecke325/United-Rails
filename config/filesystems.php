<?php

/**
 * Dateiablage.
 *
 * Große Dateien, also Galeriebilder, Vorschaubilder, Kartenkacheln und
 * Modpack-Archive, liegen nicht auf dem Webspace. Er hat nur 5 GB, und Uploads
 * sollen ihn gar nicht erst erreichen.
 *
 * Die Anwendung spricht S3-kompatibel. Welcher Dienst dahinter steht, sagt
 * ausschließlich die Umgebung. Im Quelltext steht kein Anbietername, keine
 * feste Region und kein festes Endpunktformat.
 *
 * STORAGE_ENDPOINT leer lassen, wenn der Anbieter die Standardadresse nutzt.
 * STORAGE_PATH_STYLE=true brauchen Anbieter, die den Bucket im Pfad statt in
 * der Subdomain erwarten.
 */
return [

    'default' => env('FILESYSTEM_DISK', 'local'),

    'disks' => [

        /**
         * Nur für die Entwicklung und als Rückfall. Im Betrieb auf dem Webspace
         * wird diese Platte nicht verwendet.
         */
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => rtrim((string) env('APP_URL', 'http://localhost'), '/').'/storage',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

        /** Externer, S3-kompatibler Speicher. Anbieterneutral konfiguriert. */
        's3' => [
            'driver' => 's3',
            'key' => env('STORAGE_ACCESS_KEY'),
            'secret' => env('STORAGE_SECRET_KEY'),
            'region' => env('STORAGE_REGION', 'auto'),
            'bucket' => env('STORAGE_BUCKET'),
            'endpoint' => env('STORAGE_ENDPOINT') ?: null,

            /**
             * Öffentliche Basis-URL der Dateien. Oft eine eigene Domain oder ein
             * CDN vor dem Bucket. Bleibt sie leer, baut Flysystem die URL aus
             * Endpunkt und Bucket.
             */
            'url' => env('STORAGE_PUBLIC_BASE_URL') ?: null,

            'use_path_style_endpoint' => filter_var(
                env('STORAGE_PATH_STYLE', false),
                FILTER_VALIDATE_BOOLEAN,
            ),

            'visibility' => env('STORAGE_VISIBILITY', 'private'),
            'throw' => false,
            'report' => false,
        ],

    ],

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
