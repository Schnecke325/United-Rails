@props(['entries' => []])

{{--
    Zeitleiste im Streckenband-Stil: eine durchgehende Linie mit Haltepunkten.

    Solange keine offiziellen Angaben vorliegen, zeigt sie einen Platzhalter,
    keine erfundenen Gründungsdaten.
--}}
@if ($entries === [])
    <x-ui.placeholder
        title="Offizielle United-Rails-Historie"
        token="[PLATZHALTER: OFFIZIELLE UNITED-RAILS-HISTORIE]"
    >
        Gründungsdatum, Eintragung des Vereins und die weiteren Stationen kommen vom
        Verein. Die Zeitleiste ist fertig und wird dann gefüllt.
    </x-ui.placeholder>
@else
    <ol class="relative space-y-10 border-l-2 border-[var(--border-default)] pl-8">
        @foreach ($entries as $entry)
            <li class="relative">
                <span
                    aria-hidden="true"
                    class="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full
                           border-2 border-[var(--accent-bright)] bg-[var(--surface-0)]"
                ></span>
                {{-- Freies Datumsfeld, damit auch "Frühjahr 2023" möglich ist. --}}
                <span class="ur-display text-xs uppercase text-accent-text">{{ $entry['date'] }}</span>
                <h3 class="mt-1 text-lg">{{ $entry['title'] }}</h3>
                @if (! empty($entry['body']))
                    <p class="mt-2 max-w-2xl text-fg-secondary">{{ $entry['body'] }}</p>
                @endif
            </li>
        @endforeach
    </ol>
@endif
