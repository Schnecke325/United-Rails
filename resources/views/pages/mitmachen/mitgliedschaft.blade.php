@extends('layouts.public')

@section('title', 'Mitglied werden')
@section('description', 'Interesse an einer Mitgliedschaft im United Rails e.V. bekunden.')

@section('content')
    {{-- TODO: Das Formular folgt in der Ausbaustufe "Mitgliedschaft". --}}
    <x-layout.page-header
        eyebrow="Mitmachen"
        title="Mitglied werden"
        description="Bekunde dein Interesse an einer Mitgliedschaft im United Rails e.V. Für diesen ersten Schritt reichen Minecraft-Name, Discord-Name und deine Motivation."
    />

    <x-ui.section tone="base">
        <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <x-ui.placeholder title="Interessensformular">
                Das Formular wird angeschlossen, sobald die Datenbank steht. Abgefragt werden
                Minecraft-Name, Discord-Name und Motivation, kein bürgerlicher Name.
            </x-ui.placeholder>

            <x-ui.card>
                <x-ui.card-body class="space-y-3">
                    <x-ui.card-title>Was das ist und was nicht</x-ui.card-title>
                    <p class="text-sm text-fg-secondary">
                        Diese Anfrage ist eine <strong class="text-fg">Interessensbekundung</strong>.
                        Sie ist kein Aufnahmeantrag und begründet keine Mitgliedschaft.
                    </p>
                    <p class="text-sm text-fg-secondary">
                        Wie eine vollständige Vereinsmitgliedschaft abläuft, welche Angaben dafür
                        nötig sind und welche Voraussetzungen gelten, teilt der Verein mit.
                    </p>
                    <x-ui.placeholder title="Angaben des Vereins zur Mitgliedschaft">
                        Ablauf, Voraussetzungen und Beiträge liegen noch nicht vor. Es werden keine
                        rechtlichen Aussagen erfunden.
                    </x-ui.placeholder>
                </x-ui.card-body>
            </x-ui.card>
        </div>
    </x-ui.section>
@endsection
