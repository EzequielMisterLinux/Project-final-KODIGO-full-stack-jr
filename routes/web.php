<?php

use Illuminate\Support\Facades\Route;


Route::get('/{path?}', function () {
    return view('welcome', [
        'assets' => mix('resources/js/main.jsx') // Usar mix() para assets
    ]);
})->where('path', '^(?!api|docs|sanctum).*$');