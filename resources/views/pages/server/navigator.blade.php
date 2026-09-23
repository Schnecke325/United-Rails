@extends('layouts.public')

@section('title', 'Verbindungssuche')
@section('description', 'Verbindungen im Netz von United Rails suchen: von Bahnhof zu Bahnhof.')

@section('content')
    {{--
        TODO: Suchmaske und Ergebnisliste folgen in der Ausbaustufe "Serverseite";
        die Fahrplandaten kommen später aus dem CRN-Adapter.
    --}}
    <x-layout.page-header
        eyebrow="Navigator"
        title="Verbindungssuche"
        description="Von, nach, suchen. Das Ergebnis zeigt Abfahrt, Ankunft, Dauer, Zug, Linie und Umstiege."
    />

    <x-ui.section tone="base">
        <x-ui.placeholder title="Fahrplandaten" token="CRN_API_BASE_URL">
            Die Suchmaske wird an den CRN-Adapter angeschlossen, sobald die offizielle
            Dokumentation vorliegt. Bis dahin gibt es keine Beispielverbindungen, die echt
            aussehen könnten.
        </x-ui.placeholder>
    </x-ui.section>
@endsection
