{{-- Layout aller öffentlich zugänglichen Seiten. --}}
@extends('layouts.app')

@section('body')
    <div class="flex min-h-dvh flex-col">
        <x-layout.skip-link />
        <x-layout.header />
        <main id="inhalt" class="flex-1">
            @yield('content')
        </main>
        <x-layout.footer />
    </div>
@endsection
