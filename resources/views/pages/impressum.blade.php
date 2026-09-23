@extends('layouts.public')

@section('title', 'Impressum')

@section('content')
    <x-layout.page-header eyebrow="Rechtliches" title="Impressum" />

    <x-ui.section tone="base">
        <x-ui.placeholder title="Impressumsangaben">
            Vertretungsberechtigte Personen, Anschrift, Kontakt, Registergericht und
            Registernummer liefert der Verein. Hier steht bewusst kein erfundener Text. Die
            Seite bleibt bis zur Zulieferung leer.
        </x-ui.placeholder>
    </x-ui.section>
@endsection
