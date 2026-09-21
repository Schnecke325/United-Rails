{{--
    "Was ist United Rails?" nennt die Bestandteile, die die Vorgabe aufzählt.

    Bewusst ohne Symbole: Die Gliederung entsteht über Nummerierung, Typografie
    und Abstand. Es steht hier nur, was das Projekt ausmacht, keine erfundenen
    Aussagen des Vereins.
--}}
@php
    $features = [
        ['title' => 'Streckenbau', 'body' => 'Gleise und Trassen werden geplant, gebaut und an das bestehende Netz angebunden.'],
        ['title' => 'Fahrzeuge', 'body' => 'Züge und andere Fahrzeuge entstehen im Projekt und fahren im Netz.'],
        ['title' => 'Bahnhöfe', 'body' => 'Bahnhöfe und Betriebsanlagen sind die Knotenpunkte, an denen das Netz zusammenläuft.'],
        ['title' => 'Fahrpläne', 'body' => 'Linien und Fahrpläne machen aus einzelnen Strecken planbare Verbindungen.'],
        ['title' => 'Community', 'body' => 'Auf dem Server wird gemeinsam geplant, gebaut und gefahren.'],
        ['title' => 'Verein', 'body' => 'United Rails e.V. gibt dem Projekt eine dauerhafte organisatorische Grundlage.'],
    ];
@endphp

<ul class="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    @foreach ($features as $index => $feature)
        <li class="border-t border-[var(--border-default)] pt-5">
            <span class="ur-display text-xs text-fg-muted">
                {{ str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) }}
            </span>
            <h3 class="mt-2 text-lg font-semibold">{{ $feature['title'] }}</h3>
            <p class="mt-2 text-fg-secondary">{{ $feature['body'] }}</p>
        </li>
    @endforeach
</ul>
