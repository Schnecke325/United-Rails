@props(['groups'])

{{--
    Vollflächiges Menü für Tablet und Smartphone.
    Öffnet über den gesamten Bildschirm, sperrt den Hintergrund-Scroll und
    lässt sich mit Escape schließen.

    Die Fläche hängt bewusst an document.body: Der Kopfbereich nutzt
    backdrop-filter, und ein solcher Vorfahr wird zum Bezugsrahmen für
    position: fixed. Im Kopfbereich gerendert bliebe das Menü so hoch wie
    der Kopfbereich selbst. Alpine löst das mit x-teleport.
--}}
<div
    x-data="{ open: false }"
    x-effect="document.body.style.overflow = open ? 'hidden' : ''"
    @keydown.escape.window="open = false"
    class="lg:hidden"
>
    <button
        type="button"
        @click="open = true"
        :aria-expanded="open ? 'true' : 'false'"
        aria-controls="mobile-menu"
        class="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]
               border border-[var(--border-on-dark)] text-fg-on-dark
               transition-colors hover:bg-[var(--surface-dark-2)]"
    >
        <span class="ur-sr-only">Menü öffnen</span>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" stroke-width="1.6" />
        </svg>
    </button>

    <template x-teleport="body">
        <div
            x-show="open"
            x-cloak
            id="mobile-menu"
            class="ur-dark ur-grid-surface fixed inset-0 z-[var(--z-overlay)] flex flex-col"
        >
            <div class="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-on-dark)] px-[var(--gutter)]">
                <span class="ur-display text-xs uppercase text-fg-on-dark-muted">Navigation</span>
                <button
                    type="button"
                    @click="open = false"
                    x-effect="if (open) $nextTick(() => $el.focus())"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]
                           border border-[var(--border-on-dark)] text-fg-on-dark"
                >
                    <span class="ur-sr-only">Menü schließen</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" />
                    </svg>
                </button>
            </div>

            <nav aria-label="Hauptnavigation (mobil)" class="min-h-0 flex-1 overflow-y-auto px-[var(--gutter)] py-6">
                <ul class="space-y-6">
                    @foreach ($groups as $group)
                        <li>
                            @if (! empty($group['href']))
                                <a href="{{ $group['href'] }}" class="ur-display block text-xs uppercase text-accent-text">
                                    {{ $group['label'] }}
                                </a>
                            @else
                                <span class="ur-display block text-xs uppercase text-accent-text">
                                    {{ $group['label'] }}
                                </span>
                            @endif

                            @if (! empty($group['items']))
                                <ul class="mt-3 space-y-1 border-l border-[var(--border-on-dark)] pl-4">
                                    @foreach ($group['items'] as $item)
                                        <li>
                                            <a
                                                href="{{ $item['href'] }}"
                                                @if (! empty($item['external'])) target="_blank" rel="noopener noreferrer" @endif
                                                class="block py-2 text-lg text-fg-on-dark"
                                            >
                                                {{ $item['label'] }}
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            @endif
                        </li>
                    @endforeach
                </ul>
            </nav>

            <div class="shrink-0 border-t border-[var(--border-on-dark)] px-[var(--gutter)] py-5">
                <a
                    href="{{ route('mitmachen.builder') }}"
                    class="flex h-12 items-center justify-center rounded-[var(--radius-md)]
                           bg-[var(--accent)] font-semibold text-accent-contrast"
                >
                    Builder werden
                </a>
            </div>
        </div>
    </template>
</div>
