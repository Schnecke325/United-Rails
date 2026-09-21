@props(['tone' => 'base'])

{{--
    Hintergrund. base ist weiß, raised ein hellgraues Band, grid legt
    zusätzlich das Ingenieurraster darunter, dark ist ein Kontrastband.
--}}
@php
    $tones = [
        'base' => 'bg-[var(--surface-0)]',
        'raised' => 'bg-[var(--surface-1)]',
        'grid' => 'bg-[var(--surface-1)] ur-grid-surface',
        'dark' => 'ur-dark ur-grid-surface',
    ];
@endphp

<section {{ $attributes->class(['ur-section', $tones[$tone]]) }}>
    <div class="ur-container">{{ $slot }}</div>
</section>
