import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

/**
 * Der Asset-Build läuft nur auf dem Entwicklungsrechner und in GitHub Actions.
 * Der Webspace hat kein Node und baut nichts; er liefert nur aus, was in
 * public/build liegt.
 */
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
