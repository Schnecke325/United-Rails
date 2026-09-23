@extends('layouts.public')

@section('title', 'Server')
@section('description', 'Netzkarte, Bahnhöfe, Linien, Fahrpläne und Verbindungssuche im Eisenbahnnetz von United Rails.')

@section('content')
    @php
        $status = app(\App\Services\ServerStatus\ServerStatusService::class)->current();
        $address = \App\Support\ExternalLinks::serverAddress();
    @endphp

    <x-layout.page-header
        eyebrow="Server"
        title="Das Netz"
        description="Karte, Bahnhöfe, Linien und Fahrpläne an einem Ort, mit Verbindungssuche von Bahnhof zu Bahnhof."
    />

    <x-ui.section tone="base">
        <div class="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div class="grid gap-4 sm:grid-cols-2">
                <x-ui.card interactive>
                    <x-ui.card-body class="space-y-3">
                        <x-ui.card-title>Netzkarte</x-ui.card-title>
                        <p class="text-sm text-fg-secondary">
                            Karte aus Kacheln mit Zoom, Verschieben, Bahnhöfen und Strecken.
                        </p>
                        <x-ui.button :href="route('server.karte')" variant="secondary" size="sm">
                            Karte öffnen
                        </x-ui.button>
                    </x-ui.card-body>
                </x-ui.card>
                <x-ui.card interactive>
                    <x-ui.card-body class="space-y-3">
                        <x-ui.card-title>Verbindungssuche</x-ui.card-title>
                        <p class="text-sm text-fg-secondary">
                            Von Bahnhof zu Bahnhof, mit Abfahrt, Ankunft, Dauer, Zug und Umstiegen.
                        </p>
                        <x-ui.button :href="route('server.navigator')" variant="secondary" size="sm">
                            Verbindung suchen
                        </x-ui.button>
                    </x-ui.card-body>
                </x-ui.card>
            </div>
            <x-home.server-status-panel :status="$status" :address="$address" />
        </div>
    </x-ui.section>

    <x-ui.section tone="grid">
        <x-ui.section-heading
            eyebrow="Datenquelle"
            title="Fahrplandaten aus dem Create Railway Navigator"
            description="Bahnhöfe, Linien und Fahrpläne sollen aus dem Create Railway Navigator kommen."
        />
        <x-ui.placeholder
            class="mt-8"
            title="CRN-Schnittstelle"
            token="CRN_API_BASE_URL · CRN_API_KEY"
        >
            Die offizielle Dokumentation liegt noch nicht vor. Die Anwendung hat eine fertige
            Adapterschicht, aber keine erfundenen Endpunkte, Formate oder Anmeldeverfahren.
            Sobald die Dokumentation da ist, wird ausschließlich danach umgesetzt.
        </x-ui.placeholder>
    </x-ui.section>
@endsection
