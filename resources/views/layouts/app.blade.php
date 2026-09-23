{{--
    Grundgerüst jeder Seite: Kopfdaten, Meta-Angaben, Schriften und Assets.

    Die Beschreibung und die Stammdaten kommen aus config/site.php, damit sie
    an einer Stelle stehen. Seiten setzen ihren eigenen Titel über
    @section('title') und ihre eigene Beschreibung über @section('description').
--}}
@php
    $siteName = config('site.name');
    $pageTitle = trim($__env->yieldContent('title'));
    $title = $pageTitle !== ''
        ? $pageTitle.' | '.$siteName
        : $siteName.': '.config('site.tagline');
    $description = trim($__env->yieldContent('description')) ?: config('site.description');
    $canonical = url()->current();
    $robots = trim($__env->yieldContent('robots')) ?: 'index, follow';
@endphp
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <link rel="canonical" href="{{ $canonical }}">

    <meta name="theme-color" content="{{ config('site.theme_color') }}">
    <meta name="color-scheme" content="dark">
    <meta name="robots" content="{{ $robots }}">

    <meta property="og:type" content="website">
    <meta property="og:locale" content="de_DE">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:url" content="{{ $canonical }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">

    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    @yield('body')
</body>
</html>
