{{--
    Fehlerseite. Zeigt nie Details der Ursache, weder Stacktrace noch interne
    Meldungen. Die Diagnose bleibt im Serverlog.
--}}
@extends('layouts.app')

@section('title', 'Signalstörung')
@section('robots', 'noindex, nofollow')

@section('body')
    <div class="ur-blueprint-surface flex min-h-dvh flex-col items-center justify-center px-[var(--gutter)] text-center">
        <span class="ur-display text-xs uppercase tracking-[var(--tracking-display)] text-signal-stop">
            Fehler 500
        </span>
        <h1 class="mt-4 text-3xl sm:text-4xl">Signalstörung.</h1>
        <p class="mt-4 max-w-md text-fg-secondary">
            Auf unserer Seite ist etwas schiefgelaufen. Wir kümmern uns darum.
        </p>
        {{-- Die Vorgangsnummer hilft beim Nachsehen im Log, verrät aber nichts über die Ursache. --}}
        @if (! empty($exception) && method_exists($exception, 'getTraceAsString'))
            <p class="ur-display mt-4 text-xs text-fg-muted">
                Vorgangsnummer {{ substr(sha1((string) $exception->getMessage().$exception->getLine()), 0, 12) }}
            </p>
        @endif
        <a
            href="{{ route('home') }}"
            class="mt-8 inline-flex h-12 items-center rounded-[var(--radius-md)] border border-[var(--border-strong)] px-6 font-medium"
        >
            Zurück zur Startseite
        </a>
    </div>
@endsection
