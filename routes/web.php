<?php

declare(strict_types=1);

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/**
 * Öffentliche Seiten.
 *
 * Die Adressen sind dieselben wie bisher, damit später nichts umgeleitet werden
 * muss. Jede Route hat einen Namen; Links im Auftritt zeigen über den Namen
 * dorthin und laufen deshalb nicht auseinander.
 */
Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/projekt', [PageController::class, 'projekt'])->name('projekt');
Route::get('/projekt/historie', [PageController::class, 'historie'])->name('projekt.historie');

Route::get('/ueber-uns', [PageController::class, 'ueberUns'])->name('ueber-uns');
Route::get('/ueber-uns/team', [PageController::class, 'team'])->name('ueber-uns.team');

Route::get('/server', [PageController::class, 'server'])->name('server');
Route::get('/server/karte', [PageController::class, 'serverKarte'])->name('server.karte');
Route::get('/server/navigator', [PageController::class, 'serverNavigator'])->name('server.navigator');

Route::get('/galerie', [PageController::class, 'galerie'])->name('galerie');
Route::get('/galerie/upload', [PageController::class, 'galerieUpload'])->name('galerie.upload');

Route::get('/downloads', [PageController::class, 'downloads'])->name('downloads');

Route::get('/mitmachen/builder', [PageController::class, 'builder'])->name('mitmachen.builder');
Route::get('/mitmachen/mitgliedschaft', [PageController::class, 'mitgliedschaft'])
    ->name('mitmachen.mitgliedschaft');

Route::get('/community', [PageController::class, 'community'])->name('community');

Route::get('/impressum', [PageController::class, 'impressum'])->name('impressum');
Route::get('/datenschutz', [PageController::class, 'datenschutz'])->name('datenschutz');
