@props(['images' => []])

{{--
    Vorschau auf der Startseite.

    Solange keine freigegebenen Bilder vorliegen, zeigen Platzhalter im richtigen
    Seitenverhältnis, wie der Bereich später aussieht. Die Platzhalter sind als
    solche beschriftet und werden einfach durch echte Bilder ersetzt.
--}}
@php
    $previewSlots = [
        ['label' => 'Bahnhof', 'ratio' => '4 / 5'],
        ['label' => 'Fahrzeug', 'ratio' => '4 / 3'],
        ['label' => 'Strecke', 'ratio' => '3 / 4'],
        ['label' => 'Landschaft', 'ratio' => '1 / 1'],
    ];
@endphp

@if ($images !== [])
    <x-gallery.masonry-grid :images="array_slice($images, 0, 8)" />
@else
    <div>
        <ul class="grid grid-cols-2 gap-4 lg:grid-cols-4">
            @foreach ($previewSlots as $slot)
                <li>
                    <x-ui.image-placeholder :label="$slot['label']" :ratio="$slot['ratio']" />
                </li>
            @endforeach
        </ul>
        <p class="mt-5 text-sm text-fg-muted">
            Hier stehen später Bilder aus der Community. Sie erscheinen, sobald das Team sie
            freigegeben hat.
        </p>
    </div>
@endif
