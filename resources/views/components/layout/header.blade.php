{{--
    Kopfbereich. Dunkles Band über der hellen Seite, damit die Navigation als
    eigener Bereich lesbar bleibt.

    Die Navigation wird serverseitig aus der zentralen Konfiguration gebaut,
    damit nicht konfigurierte externe Ziele gar nicht erst erscheinen.
--}}
@php
    $groups = \App\Support\Navigation::main();
@endphp

<header class="ur-dark sticky top-0 z-[var(--z-header)] border-b border-[var(--border-on-dark)]">
    <div class="ur-container flex h-16 items-center justify-between gap-4">
        <x-layout.logo />
        <x-layout.main-nav :groups="$groups" />
        <div class="flex items-center gap-3">
            <div class="hidden items-center gap-3 sm:flex">
                <x-ui.button
                    :href="route('server')"
                    variant="secondary"
                    size="sm"
                    class="border-[var(--border-on-dark)] bg-transparent text-fg-on-dark hover:border-[var(--fg-on-dark-muted)] hover:bg-[var(--surface-dark-2)]"
                >
                    Server ansehen
                </x-ui.button>
                <x-ui.button :href="route('mitmachen.builder')" size="sm">
                    Mitmachen
                </x-ui.button>
            </div>
            <x-layout.mobile-nav :groups="$groups" />
        </div>
    </div>
</header>
