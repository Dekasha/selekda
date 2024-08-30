<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'store']);
Route::post('/register', [LoginController::class, 'register']);

Route::middleware(['authenticate', 'role:admin,user'])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/profile', [LoginController::class, 'profile']);
    Route::put('/profile', [LoginController::class, 'updateProfile']);
});
Route::middleware(['authenticate', 'role:user'])->group(function () {
    route::apiResource('/blog-comment', BlogCommentController::class);
});
Route::middleware(['authenticate', 'role:admin'])->group(function () {
    Route::prefix('/admin')->group(function () {
        route::apiResource('/banner', BannerController::class);
        route::apiResource('/blog', BlogController::class);
        route::apiResource('/portfolio', PortfolioController::class);
    });
});
