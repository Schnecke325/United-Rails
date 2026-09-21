@props([
    'eyebrow' => null,
    'title',
    'description' => null,
    'as' => 'h2',
    'align' => 'left',
])

{{--
    eyebrow ist die kleine Marke über der Überschrift, im Anzeigetafel-Stil.
    as legt die Überschriftenebene fest, damit die Dokumentstruktur stimmt.
--}}
<div {{ $attributes->class(['flex flex-col gap-3', 'items-center text-center' => $align === 'center']) }}>
    @if ($eyebrow)
        <span class="ur-eyebrow">{{ $eyebrow }}</span>
    @endif

    <{{ $as }} @class(['text-2xl sm:text-3xl', 'max-w-2xl' => $align === 'center'])>{{ $title }}</{{ $as }}>

    @if ($description)
        <p @class(['max-w-2xl text-fg-secondary', 'mx-auto' => $align === 'center'])>{{ $description }}</p>
    @endif
</div>
