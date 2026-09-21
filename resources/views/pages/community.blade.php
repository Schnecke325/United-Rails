@extends('layouts.public')

@section('title', 'Community')
@section('description', 'Discord und YouTube von United Rails e.V.')

@section('content')
    @php
        $links = \App\Support\ExternalLinks::all();
    @endphp

    <x-layout.page-header
        eyebrow="Community"
        title="Discord und YouTube"
        description="Der Austausch läuft über Discord. Videos gibt es auf YouTube."
    />

    <x-ui.section tone="base">
        <x-home.community-panels
            :discord="$links['discord'] ?? null"
            :youtube="$links['youtube'] ?? null"
        />
    </x-ui.section>
@endsection
