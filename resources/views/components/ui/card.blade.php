@props(['interactive' => false, 'as' => 'div'])

{{-- interactive hebt die Karte beim Überfahren leicht an, nur für verlinkte Karten sinnvoll. --}}
@php
    $classes = 'rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)]'
        .' shadow-[var(--shadow-card)]'
        .($interactive
            ? ' transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)]'
              .' hover:border-[var(--border-default)] hover:bg-[var(--surface-3)]'
            : '');
@endphp

<{{ $as }} {{ $attributes->class($classes) }}>{{ $slot }}</{{ $as }}>
