@props(['hoster' => null])

{{--
    Partner- und Hosterbereich.

    TODO: Name, Logo und Formulierung der Partnerschaft kommen vom Verein.
    Ohne konfigurierte HOSTER_URL bleibt hier ein sichtbarer Platzhalter.
--}}
<div class="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-7 sm:p-9">
    <span class="ur-eyebrow">Partner</span>

    @if ($hoster)
        <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p class="max-w-xl text-fg-secondary">
                Server und Webseite laufen bei unserem Hostingpartner.
            </p>
            <a
                href="{{ $hoster->url }}"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent-text hover:underline"
            >
                Zum Hoster
            </a>
        </div>
    @else
        <x-ui.placeholder class="mt-4" title="Partner und Hoster" token="HOSTER_URL">
            Name, Logo und Beschreibung der Partnerschaft liegen noch nicht vor.
        </x-ui.placeholder>
    @endif
</div>
