@props(['discord' => null])

{{--
    Startbereich. Text links, Bannerbild rechts.

    Das Bild liefert der Verein. Bis dahin steht dort ein Platzhalter im selben
    Seitenverhältnis, damit sich beim Austausch nichts verschiebt.
--}}
<section class="relative isolate overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-0)]">
    <div aria-hidden="true" class="absolute inset-0 -z-10 ur-blueprint-surface opacity-70"></div>

    <div class="ur-container grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div>
            <span class="ur-eyebrow">Eingetragener Verein und Minecraft-Projekt</span>

            <h1 class="mt-5 text-hero font-semibold tracking-tight">{{ config('site.name') }}</h1>

            <p class="ur-display mt-4 text-lg uppercase tracking-[var(--tracking-display)] text-fg-muted sm:text-xl">
                {{ config('site.tagline') }}
            </p>

            <p class="mt-6 max-w-xl text-lg text-fg-secondary">
                Wir bauen in Minecraft ein Eisenbahnnetz: Strecken, Bahnhöfe, Fahrzeuge und einen
                Betrieb nach Fahrplan. Getragen wird das Ganze von United Rails e.V.
            </p>

            <div class="mt-9 flex flex-wrap gap-3">
                <x-ui.button :href="route('server')" size="lg">
                    Server ansehen
                </x-ui.button>

                @if ($discord)
                    <x-ui.button :href="$discord->url" external variant="secondary" size="lg">
                        Discord beitreten
                    </x-ui.button>
                @else
                    <x-ui.button :href="route('community')" variant="secondary" size="lg">
                        Zur Community
                    </x-ui.button>
                @endif
            </div>
        </div>

        <x-ui.image-placeholder
            label="Bannerbild der Startseite"
            ratio="4 / 3"
            hint="Querformat, zum Beispiel ein Bahnhof oder eine Strecke aus dem Netz"
        />
    </div>

    {{-- Schmales Gleisband als Abschluss des Startbereichs. --}}
    <svg
        aria-hidden="true"
        class="pointer-events-none block h-10 w-full"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
    >
        <path d="M0 14h1200" stroke="var(--border-default)" stroke-width="1.5" />
        <path d="M0 26h1200" stroke="var(--border-default)" stroke-width="1.5" />
        <path d="M0 20h1200" stroke="var(--border-subtle)" stroke-width="10" stroke-dasharray="2 12" />
        <circle cx="240" cy="20" r="4" fill="var(--accent-bright)" />
        <circle cx="880" cy="20" r="4" fill="var(--signal-clear)" />
    </svg>
</section>
