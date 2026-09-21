<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

/**
 * Die öffentlichen Seiten.
 *
 * Sie sind reine Vorlagen. Sobald Daten dazukommen, holt der Controller sie
 * über einen Service; Abfragen stehen nicht in der Vorlage.
 */
final class PageController extends Controller
{
    public function home(): View
    {
        return view('pages.home');
    }

    public function projekt(): View
    {
        return view('pages.projekt.index');
    }

    public function historie(): View
    {
        return view('pages.projekt.historie');
    }

    public function ueberUns(): View
    {
        return view('pages.ueber-uns.index');
    }

    public function team(): View
    {
        return view('pages.ueber-uns.team');
    }

    public function server(): View
    {
        return view('pages.server.index');
    }

    public function serverKarte(): View
    {
        return view('pages.server.karte');
    }

    public function serverNavigator(): View
    {
        return view('pages.server.navigator');
    }

    public function galerie(): View
    {
        return view('pages.galerie.index');
    }

    public function galerieUpload(): View
    {
        return view('pages.galerie.upload');
    }

    public function downloads(): View
    {
        return view('pages.downloads');
    }

    public function builder(): View
    {
        return view('pages.mitmachen.builder');
    }

    public function mitgliedschaft(): View
    {
        return view('pages.mitmachen.mitgliedschaft');
    }

    public function community(): View
    {
        return view('pages.community');
    }

    public function impressum(): View
    {
        return view('pages.impressum');
    }

    public function datenschutz(): View
    {
        return view('pages.datenschutz');
    }
}
