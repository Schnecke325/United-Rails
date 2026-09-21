@props(['discord' => null, 'youtube' => null])

{{--
    Discord- und YouTube-Bereich. Jede Karte erscheint nur, wenn die zugehörige
    URL konfiguriert ist; fehlt sie, steht dort ein Platzhalter statt eines
    toten Links.
--}}
<div class="mt-10 grid gap-4 md:grid-cols-2">
    <x-ui.card>
        <x-ui.card-body class="flex h-full flex-col gap-4">
            <x-ui.card-title>Discord</x-ui.card-title>
            <p class="flex-1 text-sm text-fg-secondary">
                Absprachen zu Strecken und Bauprojekten, Hilfe und Ankündigungen laufen über
                den Discord-Server.
            </p>
            @if ($discord)
                <x-ui.button :href="$discord->url" external variant="secondary" class="self-start">
                    Discord beitreten
                </x-ui.button>
            @else
                <x-ui.placeholder title="Discord-Einladung" token="DISCORD_URL">
                    Die Einladungs-URL ist noch nicht hinterlegt.
                </x-ui.placeholder>
            @endif
        </x-ui.card-body>
    </x-ui.card>

    <x-ui.card>
        <x-ui.card-body class="flex h-full flex-col gap-4">
            <x-ui.card-title>YouTube</x-ui.card-title>
            <p class="flex-1 text-sm text-fg-secondary">
                Videos zu Strecken, Fahrzeugen und Bauprojekten aus dem Netz.
            </p>
            @if ($youtube)
                <x-ui.button :href="$youtube->url" external variant="secondary" class="self-start">
                    Kanal ansehen
                </x-ui.button>
            @else
                <x-ui.placeholder title="YouTube-Kanal" token="YOUTUBE_URL">
                    Die Kanal-URL ist noch nicht hinterlegt.
                </x-ui.placeholder>
            @endif
        </x-ui.card-body>
    </x-ui.card>
</div>
