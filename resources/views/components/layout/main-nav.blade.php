@props(['groups'])

{{--
    Hauptnavigation für große Bildschirme.
    Gruppen mit Unterpunkten öffnen ein Menü, das mit Tastatur und Maus
    bedienbar ist. Der Zustand liegt in Alpine: offen ist genau eine Gruppe,
    ein Klick nach außen und Escape schließen sie.
--}}
<nav
    x-data="{ open: null }"
    @pointerdown.outside="open = null"
    @keydown.escape.window="open = null"
    aria-label="Hauptnavigation"
    class="hidden lg:block"
>
    <ul class="flex items-center gap-1">
        @foreach ($groups as $index => $group)
            @php
                $active = \App\Support\Navigation::isActive($group['href'] ?? null);
                $hasMenu = ! empty($group['items']);
                $triggerClasses = 'ur-display flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2'
                    .' text-xs uppercase transition-colors duration-[var(--duration-fast)] '
                    .($active ? 'text-accent-text' : 'text-fg-on-dark-secondary hover:text-fg-on-dark');
            @endphp

            <li
                class="relative"
                @if ($hasMenu)
                    @mouseenter="open = {{ $index }}"
                    @mouseleave="open = null"
                @endif
            >
                @if ($hasMenu)
                    <button
                        type="button"
                        class="{{ $triggerClasses }}"
                        :aria-expanded="open === {{ $index }} ? 'true' : 'false'"
                        aria-haspopup="true"
                        @click="open = open === {{ $index }} ? null : {{ $index }}"
                    >
                        {{ $group['label'] }}
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                            class="transition-transform duration-[var(--duration-fast)]"
                            :class="open === {{ $index }} && 'rotate-180'"
                        >
                            <path
                                d="M2 4l3 3 3-3"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                @else
                    <a href="{{ $group['href'] ?? '#' }}" class="{{ $triggerClasses }}">
                        {{ $group['label'] }}
                    </a>
                @endif

                @if ($hasMenu)
                    <div x-show="open === {{ $index }}" x-cloak class="absolute left-0 top-full z-[var(--z-dropdown)] min-w-64 pt-2">
                        <ul class="rounded-[var(--radius-md)] border border-[var(--border-on-dark)] bg-[var(--surface-dark-2)] p-2 shadow-[var(--shadow-raised)]">
                            @foreach ($group['items'] as $item)
                                <li>
                                    <a
                                        href="{{ $item['href'] }}"
                                        @if (! empty($item['external'])) target="_blank" rel="noopener noreferrer" @endif
                                        class="block rounded-[var(--radius-sm)] px-3 py-2 transition-colors duration-[var(--duration-fast)] hover:bg-[color-mix(in_srgb,var(--fg-on-dark)_10%,transparent)]"
                                    >
                                        <span class="flex items-center gap-1.5 text-sm font-medium text-fg-on-dark">
                                            {{ $item['label'] }}
                                            @if (! empty($item['external']))
                                                <x-layout.external-icon />
                                            @endif
                                        </span>
                                        @if (! empty($item['description']))
                                            <span class="mt-0.5 block text-xs text-fg-on-dark-muted">
                                                {{ $item['description'] }}
                                            </span>
                                        @endif
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </li>
        @endforeach
    </ul>
</nav>
