@props(['compact' => false])

{{--
    Wortmarke mit technischem Signet: zwei Schienen, die in einer Weiche
    zusammenlaufen, darüber ein Signalpunkt.

    TODO: Sobald der Verein ein Logo liefert, ersetzt es dieses Signet.
--}}
<a
    href="{{ route('home') }}"
    class="group inline-flex items-center gap-3"
    aria-label="{{ config('site.name') }}, zur Startseite"
>
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true" class="shrink-0">
        {{-- Schienenpaar mit Weiche --}}
        <path
            d="M10 28V17l6-6M22 28V17l-6-6M16 11V6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        {{-- Schwellen --}}
        <path
            d="M8.5 24.5h15M9.5 21h13"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            opacity="0.45"
        />
        {{-- Signalpunkt --}}
        <circle cx="16" cy="5" r="2.6" fill="var(--accent-bright)" />
    </svg>
    <span class="flex flex-col leading-none">
        <span class="whitespace-nowrap text-base font-semibold tracking-tight">
            {{ $compact ? config('site.short_name') : config('site.name') }}
        </span>
        @unless ($compact)
            <span class="ur-display mt-1 hidden whitespace-nowrap text-[0.6rem] uppercase text-fg-muted lg:block">
                {{ config('site.tagline') }}
            </span>
        @endunless
    </span>
</a>
