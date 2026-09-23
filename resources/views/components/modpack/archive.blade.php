@props(['versions' => []])

{{--
    Ältere Versionen, eingeklappt. Umgesetzt mit <details>, damit es auch ohne
    JavaScript und mit Tastatur funktioniert.
--}}
@if ($versions === [])
    <p class="text-sm text-fg-muted">Noch keine älteren Versionen im Archiv.</p>
@else
    <ul class="divide-y divide-[var(--border-subtle)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
        @foreach ($versions as $version)
            <li>
                <details class="group">
                    <summary class="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface-3)]">
                        <span class="ur-display text-base text-fg">Version {{ $version->version }}</span>
                        <span class="flex items-center gap-4">
                            <span class="ur-display hidden text-xs uppercase text-fg-muted sm:inline">
                                MC {{ $version->minecraftVersion }} · {{ $version->loader->value }}
                            </span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 10 10"
                                fill="none"
                                aria-hidden="true"
                                class="shrink-0 text-fg-muted transition-transform group-open:rotate-180"
                            >
                                <path
                                    d="M2 4l3 3 3-3"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                    </summary>

                    <div class="space-y-4 border-t border-[var(--border-subtle)] px-5 py-5">
                        <dl class="grid gap-3 sm:grid-cols-3">
                            <div>
                                <dt class="ur-display text-xs uppercase text-fg-muted">Veröffentlicht</dt>
                                <dd class="ur-display text-sm">{{ $version->releasedAt->format('d.m.Y') }}</dd>
                            </div>
                            <div>
                                <dt class="ur-display text-xs uppercase text-fg-muted">Minecraft</dt>
                                <dd class="ur-display text-sm">{{ $version->minecraftVersion }}</dd>
                            </div>
                            <div>
                                <dt class="ur-display text-xs uppercase text-fg-muted">Loader</dt>
                                <dd class="ur-display text-sm">{{ $version->loader->value }}</dd>
                            </div>
                        </dl>

                        @if ($version->changelog !== [])
                            <ul class="list-disc space-y-1 pl-5 text-sm text-fg-secondary">
                                @foreach ($version->changelog as $entry)
                                    <li>{{ $entry }}</li>
                                @endforeach
                            </ul>
                        @endif

                        @foreach ($version->files as $file)
                            <a href="{{ $file->url }}" class="inline-block text-sm text-accent-text hover:underline">
                                {{ $file->label }} herunterladen
                            </a>
                        @endforeach
                    </div>
                </details>
            </li>
        @endforeach
    </ul>
@endif
