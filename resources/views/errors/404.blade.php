@extends('layouts.app')

@section('title', 'Seite nicht gefunden')
@section('robots', 'noindex, nofollow')

@section('body')
    <div class="ur-blueprint-surface flex min-h-dvh flex-col items-center justify-center px-[var(--gutter)] text-center">
        <span class="ur-display text-xs uppercase tracking-[var(--tracking-display)] text-signal-caution">
            Fehler 404
        </span>
        <h1 class="mt-4 text-3xl sm:text-4xl">Diese Strecke wurde nicht gefunden.</h1>
        <p class="mt-4 max-w-md text-fg-secondary">
            Die aufgerufene Seite gibt es nicht. Vielleicht hat sie einen neuen Halt bekommen.
        </p>
        <a
            href="{{ route('home') }}"
            class="mt-8 inline-flex h-12 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 font-semibold text-accent-contrast"
        >
            Zurück zur Startseite
        </a>
    </div>
@endsection
