@extends('layouts.public')

@section('title', 'Über uns')
@section('description', 'United Rails e.V.: eingetragener Verein, Minecraft-Eisenbahnprojekt, Community und Team.')

@section('content')
    @php
        $pillars = [
            ['title' => 'Der Verein', 'body' => 'United Rails e.V. ist ein eingetragener Verein. Er trägt das Projekt organisatorisch und langfristig.'],
            ['title' => 'Das Minecraft-Projekt', 'body' => 'Auf dem Server entsteht ein zusammenhängendes Eisenbahnnetz mit Strecken, Bahnhöfen, Fahrzeugen und Fahrplänen.'],
            ['title' => 'Die Community', 'body' => 'Gebaut, geplant und gefahren wird gemeinsam. Der Austausch läuft über Discord.'],
        ];
    @endphp

    <x-layout.page-header
        eyebrow="Über uns"
        title="Verein, Projekt und Community"
        description="United Rails ist beides: ein Minecraft-Eisenbahnprojekt und ein eingetragener Verein, der es trägt."
    />

    <x-ui.section tone="base">
        <ul class="grid gap-4 md:grid-cols-3">
            @foreach ($pillars as $pillar)
                <li>
                    <x-ui.card class="h-full">
                        <x-ui.card-body class="space-y-3">
                            <x-ui.card-title>{{ $pillar['title'] }}</x-ui.card-title>
                            <p class="text-sm text-fg-secondary">{{ $pillar['body'] }}</p>
                        </x-ui.card-body>
                    </x-ui.card>
                </li>
            @endforeach
        </ul>

        <div class="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <x-ui.prose>
                <h2>Ziele</h2>
                <p>
                    Das Projekt ist auf Dauer angelegt. Strecken und Bahnhöfe werden nicht nur
                    gebaut, sondern auch betrieben, gepflegt und erweitert.
                </p>
            </x-ui.prose>
            <x-ui.placeholder title="Offizielle Vereinsangaben">
                Satzungsziele, Zweck des Vereins, Gründungsdaten und offizielle Formulierungen
                liefert der Verein. Bis dahin steht hier keine offizielle Aussage.
            </x-ui.placeholder>
        </div>
    </x-ui.section>

    <x-ui.section tone="grid">
        <x-ui.section-heading
            eyebrow="Team"
            title="Team"
            description="Die Profile pflegt das Team selbst im internen Bereich."
        />
        <div class="mt-8">
            <x-ui.button :href="route('ueber-uns.team')" variant="secondary">
                Zum Team
            </x-ui.button>
        </div>
    </x-ui.section>
@endsection
