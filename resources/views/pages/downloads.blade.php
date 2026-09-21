@extends('layouts.public')

@section('title', 'Downloads')
@section('description', 'Das Modpack von United Rails: aktuelle Version, ältere Versionen, Änderungslisten und Downloads.')

@section('content')
    @php
        $links = \App\Support\ExternalLinks::all();

        // TODO: Releases kommen aus der Datenbank und werden im Admin-Dashboard gepflegt,
        // nicht im Quelltext.
        $versions = [];
        $current = null;
        $older = [];

        foreach ($versions as $version) {
            if ($version->isCurrent) {
                $current ??= $version;
            } else {
                $older[] = $version;
            }
        }
    @endphp

    <x-layout.page-header
        eyebrow="Downloads"
        title="Modpack"
        description="Lade das Modpack herunter, das für den Server von United Rails gebraucht wird."
    />

    <x-ui.section tone="base">
        <x-ui.section-heading
            eyebrow="Aktuell"
            title="Aktuelle Version"
            description="Version, Minecraft-Version, Loader und Änderungen der Fassung, die auf dem Server läuft."
        />
        <div class="mt-8">
            <x-modpack.current
                :version="$current"
                :curseforge="$links['curseforge'] ?? null"
                :modrinth="$links['modrinth'] ?? null"
            />
        </div>
    </x-ui.section>

    <x-ui.section tone="raised">
        <x-ui.section-heading
            eyebrow="Archiv"
            title="Ältere Versionen"
            description="Zum Aufklappen: Version, Datum, Minecraft-Version, Loader, Änderungen und Download."
        />
        <div class="mt-8">
            <x-modpack.archive :versions="$older" />
        </div>
    </x-ui.section>
@endsection
