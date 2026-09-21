@props(['version' => null, 'curseforge' => null, 'modrinth' => null])

{{-- Aktuelle Modpack-Version, prominent dargestellt. --}}
@if (! $version)
    <x-ui.placeholder title="Aktuelle Modpack-Version">
        Sobald das Team im Dashboard ein Release anlegt, erscheint es hier mit Version,
        Minecraft-Version, Loader, Änderungsliste und Download.
    </x-ui.placeholder>
@else
    <div class="rounded-[var(--radius-lg)] border border-[var(--accent-border)] bg-[var(--accent-soft)] p-7 sm:p-9">
        <div class="flex flex-wrap items-center gap-3">
            <x-ui.status-badge tone="clear">Aktuell</x-ui.status-badge>
            <span class="ur-display text-xs uppercase text-fg-muted">
                Veröffentlicht am {{ $version->releasedAt->format('d.m.Y') }}
            </span>
        </div>

        <h3 class="ur-display mt-4 text-3xl text-fg">{{ $version->version }}</h3>

        <dl class="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
                <dt class="ur-display text-xs uppercase text-fg-muted">Minecraft</dt>
                <dd class="ur-display mt-1 text-lg text-fg">{{ $version->minecraftVersion }}</dd>
            </div>
            <div>
                <dt class="ur-display text-xs uppercase text-fg-muted">Loader</dt>
                <dd class="ur-display mt-1 text-lg text-fg">{{ $version->loaderLabel() }}</dd>
            </div>
            <div>
                <dt class="ur-display text-xs uppercase text-fg-muted">Dateien</dt>
                <dd class="ur-display mt-1 text-lg text-fg">{{ count($version->files) }}</dd>
            </div>
        </dl>

        @if ($version->changelog !== [])
            <div class="mt-6">
                <p class="ur-display text-xs uppercase text-fg-muted">Änderungen</p>
                <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-fg-secondary">
                    @foreach ($version->changelog as $entry)
                        <li>{{ $entry }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="mt-8 flex flex-wrap gap-3">
            @if (isset($version->files[0]))
                <x-ui.button :href="$version->files[0]->url" size="lg">
                    Direkt herunterladen
                </x-ui.button>
            @endif
            @if ($curseforge)
                <x-ui.button :href="$curseforge->url" external variant="secondary" size="lg">
                    CurseForge
                </x-ui.button>
            @endif
            @if ($modrinth)
                <x-ui.button :href="$modrinth->url" external variant="secondary" size="lg">
                    Modrinth
                </x-ui.button>
            @endif
        </div>
    </div>
@endif
