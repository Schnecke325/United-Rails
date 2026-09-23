@extends('layouts.public')

@section('title', 'Builder werden')
@section('description', 'Bewirb dich als Builder bei United Rails e.V.')

@section('content')
    @php
        $steps = [
            ['title' => 'Bewerbung schreiben', 'body' => 'Minecraft-Name, Discord-Name und warum du dabei sein willst.'],
            ['title' => 'Bilder anhängen', 'body' => 'Mehrere Bilder deiner Bauwerke, Fahrzeuge oder Strecken.'],
            ['title' => 'Rückmeldung abwarten', 'body' => 'Das Team sieht sich jede Bewerbung an und meldet sich über Discord.'],
        ];
    @endphp

    {{--
        TODO: Das Bewerbungsformular folgt in der Ausbaustufe "Bewerbungen";
        es braucht Datenbank, Dateiablage und die Upload-Prüfung.
    --}}
    <x-layout.page-header
        eyebrow="Mitmachen"
        title="Builder werden"
        description="Du baust Bahnhöfe, Strecken oder Fahrzeuge? Zeig uns, was du kannst."
    />

    <x-ui.section tone="base">
        <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <x-ui.placeholder title="Bewerbungsformular">
                Das Formular wird angeschlossen, sobald Datenbank und Dateiablage stehen. Es
                enthält außerdem die Ankreuzoption für Interesse an einer Mitgliedschaft im
                United Rails e.V.
            </x-ui.placeholder>

            <x-ui.card>
                <x-ui.card-body class="space-y-5">
                    <x-ui.card-title>So läuft es ab</x-ui.card-title>
                    <ol class="space-y-4">
                        @foreach ($steps as $index => $step)
                            <li class="flex gap-3">
                                <span class="ur-display mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent-border)] text-xs text-accent">
                                    {{ $index + 1 }}
                                </span>
                                <span>
                                    <span class="block font-medium text-fg">{{ $step['title'] }}</span>
                                    <span class="block text-sm text-fg-secondary">{{ $step['body'] }}</span>
                                </span>
                            </li>
                        @endforeach
                    </ol>
                </x-ui.card-body>
            </x-ui.card>
        </div>
    </x-ui.section>
@endsection
