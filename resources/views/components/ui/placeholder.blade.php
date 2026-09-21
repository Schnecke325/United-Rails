@props(['title', 'token' => null])

{{--
    Sichtbarer Platzhalter für Angaben, die der Verein noch liefern muss, und
    für Anbindungen, deren Dokumentation noch aussteht.

    Deutlich als Platzhalter erkennbar, damit niemand ihn für eine echte Angabe
    hält und niemand in Versuchung kommt, hier etwas zu erfinden.
--}}
<div {{ $attributes->class([
    'rounded-[var(--radius-md)] border border-dashed border-[var(--signal-info)]',
    'bg-[var(--signal-info-soft)] p-5',
]) }}>
    <div class="flex flex-wrap items-center gap-3">
        <span class="ur-display text-xs uppercase text-signal-info">Platzhalter</span>
        <span class="font-semibold text-fg">{{ $title }}</span>
    </div>

    @if (trim($slot) !== '')
        <div class="mt-2 text-sm text-fg-secondary">{{ $slot }}</div>
    @endif

    @if ($token)
        <code class="ur-display mt-3 block text-xs text-fg-muted">{{ $token }}</code>
    @endif
</div>
