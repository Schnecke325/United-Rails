@props(['label', 'ratio' => '16 / 9', 'hint' => null])

{{--
    Steht dort, wo später ein echtes Bild hinkommt.

    Der Platzhalter hält das Seitenverhältnis, damit sich das Layout beim
    Austausch nicht verschiebt, und benennt, welches Bild gebraucht wird.
--}}
<div
    role="img"
    aria-label="Platzhalter für ein Bild: {{ $label }}"
    style="aspect-ratio: {{ $ratio }}"
    {{ $attributes->class([
        'ur-image-placeholder relative flex w-full flex-col items-center justify-center gap-1',
        'rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)]',
        'px-4 text-center',
    ]) }}
>
    <span class="ur-display text-xs uppercase tracking-[var(--tracking-display)] text-fg-muted">
        Bild folgt
    </span>
    <span class="text-sm font-medium text-fg-secondary">{{ $label }}</span>
    @if ($hint)
        <span class="text-xs text-fg-muted">{{ $hint }}</span>
    @endif
</div>
