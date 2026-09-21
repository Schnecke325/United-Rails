@extends('layouts.public')

@section('title', 'Netzkarte')
@section('description', 'Die Karte des Eisenbahnnetzes von United Rails mit Bahnhöfen und Strecken.')

@section('content')
    {{--
        TODO: Die Kartenkacheln (tile_z_x_y.png) liegen noch nicht vor. Die
        Kartenkomponente folgt in der Ausbaustufe "Serverseite".
    --}}
    <x-layout.page-header
        eyebrow="Karte"
        title="Netzkarte"
        description="Kachelbasierte Karte mit Zoom, Verschieben, Bahnhöfen, Strecken und Punkten von Interesse."
    />

    <x-ui.section tone="base">
        <x-ui.placeholder title="Kartenkacheln">
            Die Karte lädt ein Kachelraster (zum Beispiel <code>tile_0_0.png</code>,
            <code>tile_0_1.png</code>). Sobald ein Satz Kacheln vorliegt, wird er hier
            eingebunden, ohne ein einzelnes riesiges Bild und ohne Annahme über das
            erzeugende Werkzeug.
        </x-ui.placeholder>
    </x-ui.section>
@endsection
