@extends('layouts.public')

@section('content')
    @php
        $links = \App\Support\ExternalLinks::all();
        $address = \App\Support\ExternalLinks::serverAddress();
        $status = app(\App\Services\ServerStatus\ServerStatusService::class)->current();

        // TODO: Sobald die Datenbank steht, kommen freigegebene Bilder und das
        // aktuelle Modpack-Release aus den jeweiligen Services.
        $galleryPreview = [];
        $currentModpack = null;
    @endphp

    <x-home.hero :discord="$links['discord'] ?? null" />

    {{-- 2. Was ist United Rails? --}}
    <x-ui.section tone="base">
        <x-ui.section-heading
            eyebrow="Überblick"
            title="Was ist United Rails?"
            description="Ein Minecraft-Eisenbahnserver und ein eingetragener Verein. Gebaut wird ein zusammenhängendes Netz aus Strecken, Bahnhöfen und Fahrzeugen, betrieben nach Fahrplan."
        />
        <x-home.feature-grid />
    </x-ui.section>

    {{-- 3. Projekt und Historie --}}
    <x-ui.section tone="grid">
        <div class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <x-ui.section-heading
                eyebrow="Projekt"
                title="Das Projekt"
                description="Strecken werden geplant, gebaut, angebunden und in Betrieb genommen. Das Projekt ist auf Dauer angelegt, der Verein gibt ihm die organisatorische Grundlage."
            />
            <div class="space-y-5">
                <x-ui.placeholder
                    title="Offizielle Vereinshistorie"
                    token="[PLATZHALTER: OFFIZIELLE UNITED-RAILS-HISTORIE]"
                >
                    Gründungsdaten und Meilensteine liegen noch nicht vor. Die Zeitleiste steht
                    bereit und wird gefüllt, sobald der Verein die offiziellen Angaben liefert.
                    Es werden keine Daten erfunden.
                </x-ui.placeholder>
                <x-ui.button :href="route('projekt.historie')" variant="secondary">
                    Zur Zeitleiste
                </x-ui.button>
            </div>
        </div>
    </x-ui.section>

    {{-- 4. Galerie-Vorschau --}}
    <x-ui.section tone="base">
        <div class="flex flex-wrap items-end justify-between gap-4">
            <x-ui.section-heading
                eyebrow="Galerie"
                title="Bauwerke, Fahrzeuge, Strecken"
                description="Bilder aus der Community, sortiert nach festen Kategorien und vom Team freigegeben."
            />
            <x-ui.button :href="route('galerie')" variant="secondary">
                Alle Bilder
            </x-ui.button>
        </div>
        <div class="mt-10">
            <x-gallery.preview :images="$galleryPreview" />
        </div>
    </x-ui.section>

    {{-- 5. Aktuelles Modpack --}}
    <x-ui.section tone="raised">
        <div class="flex flex-wrap items-end justify-between gap-4">
            <x-ui.section-heading
                eyebrow="Downloads"
                title="Aktuelles Modpack"
                description="Version, Minecraft-Version, Loader und Änderungsliste. Direkt oder über CurseForge und Modrinth."
            />
            <x-ui.button :href="route('downloads')" variant="secondary">
                Alle Versionen
            </x-ui.button>
        </div>
        <div class="mt-10">
            <x-modpack.current
                :version="$currentModpack"
                :curseforge="$links['curseforge'] ?? null"
                :modrinth="$links['modrinth'] ?? null"
            />
        </div>
    </x-ui.section>

    {{-- 6. Server und Community --}}
    <x-ui.section tone="grid">
        <div class="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
                <x-ui.section-heading
                    eyebrow="Server"
                    title="Karte, Linien und Fahrpläne"
                    description="Die Serverseite führt Netzkarte, Bahnhöfe, Linien und Fahrpläne zusammen, mit einer Verbindungssuche von Bahnhof zu Bahnhof."
                />
                <div class="mt-8 flex flex-wrap gap-3">
                    <x-ui.button :href="route('server')">Serverseite öffnen</x-ui.button>
                    <x-ui.button :href="route('server.navigator')" variant="secondary">
                        Verbindung suchen
                    </x-ui.button>
                </div>
            </div>
            <x-home.server-status-panel :status="$status" :address="$address" />
        </div>
    </x-ui.section>

    {{-- 7. Partner und Hoster --}}
    <x-ui.section tone="base">
        <x-home.hoster-banner :hoster="$links['hoster'] ?? null" />
    </x-ui.section>

    {{-- 8. YouTube und Discord --}}
    <x-ui.section tone="raised">
        <x-ui.section-heading
            eyebrow="Community"
            title="Discord und YouTube"
            description="Der Austausch läuft über Discord. Videos gibt es auf YouTube."
        />
        <x-home.community-panels
            :discord="$links['discord'] ?? null"
            :youtube="$links['youtube'] ?? null"
        />
    </x-ui.section>

    {{-- 9. Mitmachen --}}
    <x-ui.section tone="grid">
        <x-ui.section-heading
            eyebrow="Mitmachen"
            title="Zwei Wege in das Projekt"
            description="Bau mit am Netz oder unterstütze den Verein als Mitglied."
            align="center"
            class="mx-auto"
        />
        <div class="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            <x-ui.card interactive>
                <x-ui.card-body class="flex h-full flex-col gap-4">
                    <x-ui.card-title>Builder werden</x-ui.card-title>
                    <p class="flex-1 text-sm text-fg-secondary">
                        Bewirb dich mit Minecraft-Name, Discord-Name und Bildern deiner Bauwerke
                        oder Fahrzeuge. Das Team sieht sich jede Bewerbung an.
                    </p>
                    <a href="{{ route('mitmachen.builder') }}" class="text-accent hover:underline">
                        Zur Bewerbung
                    </a>
                </x-ui.card-body>
            </x-ui.card>
            <x-ui.card interactive>
                <x-ui.card-body class="flex h-full flex-col gap-4">
                    <x-ui.card-title>Mitglied werden</x-ui.card-title>
                    <p class="flex-1 text-sm text-fg-secondary">
                        Sag uns, dass du Mitglied im United Rails e.V. werden möchtest. Für den
                        ersten Schritt reichen Minecraft-Name und Discord-Name.
                    </p>
                    <a href="{{ route('mitmachen.mitgliedschaft') }}" class="text-accent hover:underline">
                        Interesse bekunden
                    </a>
                </x-ui.card-body>
            </x-ui.card>
        </div>
    </x-ui.section>
@endsection
