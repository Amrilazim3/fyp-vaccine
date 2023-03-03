<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TermsOfServiceController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, '__invoke'])->middleware('guest')->name('welcome');

Route::get('terms-of-service', [TermsOfServiceController::class, '__invoke'])->name('terms-of-service');

Route::get('privacy-policy', [PrivacyPolicyController::class, '__invoke'])->name('privacy-policy');

Route::get('about', [AboutController::class, '__invoke'])->name('about');

Route::get('team', [TeamController::class, '__invoke'])->name('team');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
