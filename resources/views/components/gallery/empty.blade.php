@props(['compact' => false])

{{-- Zustand, solange keine freigegebenen Bilder vorliegen. --}}
<div class="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-1)] p-10 text-center">
    <p class="text-fg">Noch keine freigegebenen Bilder.</p>
    <p class="mx-auto mt-2 max-w-md text-sm text-fg-muted">
        Eingereichte Bilder erscheinen hier, sobald das Team sie freigegeben hat.
    </p>
    @unless ($compact)
        <x-ui.button :href="route('galerie.upload')" variant="secondary" class="mt-5">
            Bild einreichen
        </x-ui.button>
    @endunless
</div>
