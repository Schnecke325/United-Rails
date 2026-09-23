@extends('layouts.public')

@section('title', 'Datenschutz')

@section('content')
    <x-layout.page-header eyebrow="Rechtliches" title="Datenschutz" />

    <x-ui.section tone="base">
        <div class="space-y-6">
            <x-ui.placeholder title="Datenschutzerklärung">
                Die Erklärung liefert der Verein. Es wird kein rechtlicher Text erfunden.
            </x-ui.placeholder>

            <x-ui.prose>
                <h2>Woran sich die Erklärung orientieren muss</h2>
                <p>
                    Damit die Zulieferung vollständig wird, hier die Stellen, an denen diese
                    Webseite personenbezogene Daten verarbeitet. Das ist eine technische
                    Aufstellung, keine Datenschutzerklärung.
                </p>
                <ul>
                    <li>Anmeldung von Teammitgliedern über Discord (Discord-ID, Benutzername, Avatar)</li>
                    <li>Galerie-Uploads (Minecraft-Name, optional Discord-Name, Bild, Titel, Beschreibung)</li>
                    <li>Builder-Bewerbungen (Minecraft-Name, Discord-Name, Begründung, Bilder)</li>
                    <li>Interessensbekundungen zur Mitgliedschaft (Minecraft-Name, Discord-Name, Motivation)</li>
                    <li>Protokoll administrativer Aktionen im internen Bereich</li>
                    <li>Server-Logs des Hosters</li>
                </ul>
            </x-ui.prose>
        </div>
    </x-ui.section>
@endsection
