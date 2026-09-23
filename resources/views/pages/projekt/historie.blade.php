@extends('layouts.public')

@section('title', 'Historie')
@section('description', 'Die Entstehungsgeschichte von United Rails e.V. als Zeitleiste.')

@section('content')
    @php
        // TODO: Die offiziellen Stationen der Vereinsgeschichte liegen noch nicht vor.
        // Es werden bewusst keine Daten erfunden; die Zeitleiste bleibt bis dahin leer.
        $entries = [];
    @endphp

    <x-layout.page-header
        eyebrow="Historie"
        title="Historie"
        description="Die wichtigsten Stationen von United Rails in zeitlicher Reihenfolge."
    />

    <x-ui.section tone="base">
        <x-home.timeline :entries="$entries" />
    </x-ui.section>
@endsection
