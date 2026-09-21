@extends('layouts.public')

@section('title', 'Team')
@section('description', 'Die Teamprofile von United Rails e.V.')

@section('content')
    @php
        // TODO: Teamprofile kommen aus der Datenbank und werden im Admin-Dashboard
        // gepflegt. Es werden keine Personen erfunden.
        $members = [];
    @endphp

    <x-layout.page-header
        eyebrow="Team"
        title="Das Team"
        description="Anzeigename, Rolle, Avatar und eine kurze Beschreibung. Mehr wird öffentlich nicht gezeigt."
    />

    <x-ui.section tone="base">
        @if ($members === [])
            <x-ui.placeholder title="Teamprofile">
                Die Profile werden vom Team selbst im internen Bereich angelegt. Private Angaben
                erscheinen nie auf der öffentlichen Seite.
            </x-ui.placeholder>
        @endif
    </x-ui.section>
@endsection
