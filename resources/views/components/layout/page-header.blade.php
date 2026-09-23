@props(['eyebrow' => null, 'title', 'description' => null])

{{-- Kopfbereich einer Unterseite: Marke, Überschrift, kurze Einordnung. --}}
<header {{ $attributes->class([
    'ur-blueprint-surface border-b border-[var(--border-subtle)] bg-[var(--surface-1)]',
]) }}>
    <div class="ur-container py-14 sm:py-20">
        @if ($eyebrow)
            <span class="ur-eyebrow">{{ $eyebrow }}</span>
        @endif

        <h1 class="mt-4 max-w-3xl text-3xl sm:text-4xl">{{ $title }}</h1>

        @if ($description)
            <p class="mt-5 max-w-2xl text-lg text-fg-secondary">{{ $description }}</p>
        @endif

        @if (trim($slot) !== '')
            <div class="mt-8">{{ $slot }}</div>
        @endif
    </div>
</header>
