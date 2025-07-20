<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TowingRequestController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/requests', [TowingRequestController::class, 'index']);
    Route::post('/requests', [TowingRequestController::class, 'store']);
    Route::put('/requests/{request}/accept', [TowingRequestController::class, 'acceptRequest']);
});
