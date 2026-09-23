{{-- Fußbereich als dunkles Band, das die helle Seite unten abschließt. --}}
@php
    $nav = \App\Support\Navigation::footer();

    $columns = [
        ['title' => 'Projekt', 'items' => $nav['projekt']],
        ['title' => 'Plattform', 'items' => $nav['plattform']],
        ['title' => 'Mitmachen', 'items' => $nav['mitmachen']],
    ];

    if ($nav['extern'] !== []) {
        $columns[] = ['title' => 'Community', 'items' => $nav['extern']];
    }
@endphp

<footer class="ur-dark">
    <div class="ur-container py-14">
        <div class="ur-rail-divider mb-12" aria-hidden="true"></div>

        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div class="lg:col-span-1">
                <p class="text-lg font-semibold text-fg-on-dark">{{ config('site.name') }}</p>
                <p class="ur-display mt-1 text-xs uppercase text-fg-on-dark-muted">
                    {{ config('site.tagline') }}
                </p>
                <p class="mt-4 max-w-xs text-sm text-fg-on-dark-muted">
                    {{ config('site.description') }}
                </p>
            </div>

            @foreach ($columns as $column)
                <nav aria-label="{{ $column['title'] }}">
                    <p class="ur-display text-xs uppercase text-fg-on-dark-muted">{{ $column['title'] }}</p>
                    <ul class="mt-4 space-y-2.5">
                        @foreach ($column['items'] as $item)
                            <li>
                                <a
                                    href="{{ $item['href'] }}"
                                    @if (! empty($item['external'])) target="_blank" rel="noopener noreferrer" @endif
                                    class="text-sm text-fg-on-dark-secondary transition-colors hover:text-fg-on-dark"
                                >
                                    {{ $item['label'] }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </nav>
            @endforeach
        </div>

        <div class="mt-12 flex flex-col gap-4 border-t border-[var(--border-on-dark)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs text-fg-on-dark-muted">
                &copy; {{ now()->year }} {{ config('site.name') }}
            </p>
            <ul class="flex flex-wrap gap-5">
                @foreach ($nav['rechtliches'] as $item)
                    <li>
                        <a
                            href="{{ $item['href'] }}"
                            class="text-xs text-fg-on-dark-muted transition-colors hover:text-fg-on-dark"
                        >
                            {{ $item['label'] }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</footer>
