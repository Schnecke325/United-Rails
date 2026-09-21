@extends('layouts.public')

@section('title', 'Galerie')
@section('description', 'Bilder aus der Community von United Rails: Fahrzeuge, Bauwerke, Bahnhöfe, Strecken und Landschaft.')

@section('content')
    @php
        // TODO: Freigegebene Bilder kommen aus der Datenbank, sobald sie steht.
        $images = [];
    @endphp

    <x-layout.page-header
        eyebrow="Galerie"
        title="Bilder aus dem Netz"
        description="Alle Bilder stammen aus der Community. Vor der Veröffentlichung sieht das Team sie durch."
    >
        <x-ui.button :href="route('galerie.upload')">Bild einreichen</x-ui.button>
    </x-layout.page-header>

    <x-ui.section tone="base">
        {{-- Feste Kategorien, keine frei erfundenen Schlagworte. --}}
        <nav aria-label="Kategorien">
            <ul class="flex flex-wrap gap-2">
                @foreach (\App\Enums\GalleryCategory::cases() as $category)
                    <li>
                        <span class="ur-display inline-flex rounded-[var(--radius-pill)] border
                                     border-[var(--border-default)] px-3 py-1 text-xs
                                     uppercase text-fg-secondary">
                            {{ $category->label() }}
                        </span>
                    </li>
                @endforeach
            </ul>
        </nav>

        <div class="mt-8">
            @if ($images === [])
                <x-gallery.empty />
            @else
                <x-gallery.masonry-grid :images="$images" />
            @endif
        </div>
    </x-ui.section>
@endsection
