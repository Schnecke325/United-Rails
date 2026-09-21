@props([
    'variant' => 'primary',
    'size' => 'md',
    'href' => null,
    'external' => false,
    'type' => 'button',
])

@php
    $base = 'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap'
        .' transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]'
        .' disabled:pointer-events-none disabled:opacity-50 rounded-[var(--radius-md)]';

    $variants = [
        'primary' => 'bg-[var(--accent)] text-accent-contrast hover:bg-[var(--accent-hover)]'
            .' active:bg-[var(--accent-active)] font-semibold',
        'secondary' => 'border border-[var(--border-strong)] bg-[var(--surface-0)] text-fg'
            .' hover:border-[var(--fg-muted)] hover:bg-[var(--surface-3)]',
        'ghost' => 'text-fg-secondary hover:bg-[var(--surface-1)] hover:text-fg',
        'danger' => 'border border-[var(--signal-stop)] text-signal-stop hover:bg-[var(--signal-stop-soft)]',
    ];

    $sizes = [
        'sm' => 'h-9 px-3.5 text-sm',
        'md' => 'h-10 px-4 text-sm',
        'lg' => 'h-12 px-6 text-base',
    ];

    $classes = trim($base.' '.$variants[$variant].' '.$sizes[$size]);
@endphp

@if ($href)
    {{-- Externe Ziele bekommen automatisch die sicheren rel-Attribute. --}}
    <a
        href="{{ $href }}"
        @if ($external) target="_blank" rel="noopener noreferrer" @endif
        {{ $attributes->class($classes) }}
    >{{ $slot }}</a>
@else
    <button type="{{ $type }}" {{ $attributes->class($classes) }}>{{ $slot }}</button>
@endif
