@extends('layouts.public')

@section('title', 'Bild einreichen')
@section('description', 'Reiche ein Bild für die Galerie von United Rails ein.')
@section('robots', 'noindex, follow')

@section('content')
    {{--
        TODO: Das Formular folgt in der Ausbaustufe "Galerie"; es braucht die
        Datenbank, den Dateispeicher und die Upload-Prüfung.
    --}}
    <x-layout.page-header
        eyebrow="Galerie"
        title="Bild einreichen"
        description="Bild, Titel, Beschreibung, Kategorien, Minecraft-Name und optional dein Discord-Name."
    />

    <x-ui.section tone="base">
        <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <x-ui.placeholder title="Upload-Formular">
                Das Formular wird angeschlossen, sobald Datenbank und Dateiablage stehen.
            </x-ui.placeholder>

            <x-ui.card>
                <x-ui.card-body class="space-y-4 text-sm text-fg-secondary">
                    <p class="font-medium text-fg">Was nach dem Einreichen passiert</p>
                    <p>
                        Eingereichte Bilder sind nicht sofort öffentlich. Das Team sieht sich jedes
                        Bild an und gibt es frei oder lehnt es ab.
                    </p>
                    <div>
                        <p class="ur-display text-xs uppercase text-fg-muted">Kategorien zur Auswahl</p>
                        <p class="mt-1">
                            {{ implode(' · ', array_values(\App\Enums\GalleryCategory::options())) }}
                        </p>
                    </div>
                </x-ui.card-body>
            </x-ui.card>
        </div>
    </x-ui.section>
@endsection
