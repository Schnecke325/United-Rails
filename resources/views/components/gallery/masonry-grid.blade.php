@props(['images'])

{{--
    Masonry-Raster im Pinterest-Stil.

    Umgesetzt mit CSS-Columns: Bilder behalten ihre Höhe, das Raster bricht
    sauber von vier Spalten auf eine herunter und braucht kein JavaScript.
--}}
<ul {{ $attributes->class('columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>li]:mb-4') }}>
    @foreach ($images as $image)
        <li class="break-inside-avoid">
            <a
                href="/galerie/{{ $image->id }}"
                class="group relative block overflow-hidden rounded-[var(--radius-md)]
                       border border-[var(--border-subtle)] bg-[var(--surface-2)]
                       transition-colors duration-[var(--duration-base)] hover:border-[var(--border-strong)]"
            >
                <img
                    src="{{ $image->displayUrl() }}"
                    alt="{{ $image->title }}"
                    width="{{ $image->width }}"
                    height="{{ $image->height }}"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading="lazy"
                    decoding="async"
                    class="w-full"
                >

                <div
                    class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(15,28,38,0.92)] to-transparent p-4
                           opacity-0 transition-opacity duration-[var(--duration-base)]
                           group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                    <p class="font-medium text-[#ffffff]">{{ $image->title }}</p>
                    <p class="ur-display mt-1 text-xs uppercase text-[#d6dee5]">
                        {{ $image->categoryLabels() }}
                    </p>
                </div>
            </a>
        </li>
    @endforeach
</ul>
