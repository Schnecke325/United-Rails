@props(['status', 'address' => null])

{{--
    Serverstatus im Stil einer Anzeigetafel.

    Ohne echte Datenquelle steht hier "keine Daten", nie erfundene Spielerzahlen.
--}}
<div class="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-inset)] p-6">
    <div class="flex items-center justify-between gap-4">
        <span class="ur-display text-xs uppercase text-fg-muted">Serverstatus</span>
        @if ($status->isOnline())
            <x-ui.status-badge tone="clear">Online</x-ui.status-badge>
        @elseif ($status->isOffline())
            <x-ui.status-badge tone="stop">Offline</x-ui.status-badge>
        @else
            <x-ui.status-badge tone="info">Keine Daten</x-ui.status-badge>
        @endif
    </div>

    @if ($status->isOnline())
        <p class="ur-display mt-4 text-3xl text-fg">
            {{ $status->players }} <span class="text-fg-muted">/ {{ $status->maxPlayers }}</span>
            <span class="ml-2 text-sm text-fg-muted">Spieler</span>
        </p>
    @endif

    @if ($status->isUnknown())
        <x-ui.placeholder class="mt-4" title="Live-Serverstatus" token="SERVER_STATUS_API_URL">
            Es ist noch keine Statusquelle hinterlegt. Die Anzeige bleibt leer, bis eine
            echte Schnittstelle konfiguriert ist.
        </x-ui.placeholder>
    @endif

    <div class="mt-6 border-t border-[var(--border-subtle)] pt-4">
        <span class="ur-display block text-xs uppercase text-fg-muted">Adresse</span>
        @if ($address)
            <code class="ur-display mt-1 block text-base text-fg">{{ $address }}</code>
        @else
            <span class="mt-1 block text-sm text-fg-muted">
                Noch nicht hinterlegt (SERVER_URL)
            </span>
        @endif
    </div>
</div>
