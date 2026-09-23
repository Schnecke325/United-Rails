@extends('layouts.public')

@section('title', 'Projekt')
@section('description', 'Das Eisenbahnprojekt von United Rails: Streckenbau, Bahnhöfe, Fahrzeuge und Fahrplanbetrieb in Minecraft.')

@section('content')
    <x-layout.page-header
        eyebrow="Projekt"
        title="Das Eisenbahnprojekt"
        description="Ein zusammenhängendes Netz aus Strecken, Bahnhöfen und Fahrzeugen, betrieben nach Fahrplan."
    />

    <x-ui.section tone="base">
        <div class="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <x-ui.prose>
                <h2>Wie gebaut wird</h2>
                <p>
                    Eine Strecke wird zuerst geplant, dann gebaut und an das bestehende Netz
                    angebunden. Dazu kommen Bahnhöfe, Betriebsanlagen und Signaltechnik. Was
                    fertig ist, geht in den Fahrplanbetrieb.
                </p>
                <h2>Wer baut</h2>
                <p>
                    Am Netz arbeitet ein Team aus Buildern. Wer mitbauen möchte, bewirbt sich mit
                    eigenen Bauwerken oder Fahrzeugen.
                </p>
            </x-ui.prose>

            <div class="space-y-4">
                <x-ui.placeholder title="Offizielle Projektbeschreibung">
                    Der ausführliche Text zum Projekt, seinen Zielen und seinem Umfang kommt vom
                    Verein. Die Abschnitte hier beschreiben nur die Arbeitsweise und enthalten
                    keine offiziellen Aussagen.
                </x-ui.placeholder>
                <x-ui.button :href="route('mitmachen.builder')" variant="secondary">
                    Als Builder bewerben
                </x-ui.button>
            </div>
        </div>
    </x-ui.section>

    <x-ui.section tone="grid">
        <x-ui.section-heading
            eyebrow="Historie"
            title="Historie"
            description="Die Zeitleiste der Gründung und der wichtigsten Schritte."
        />
        <div class="mt-8">
            <x-ui.button :href="route('projekt.historie')" variant="secondary">
                Zur Zeitleiste
            </x-ui.button>
        </div>
    </x-ui.section>
@endsection
