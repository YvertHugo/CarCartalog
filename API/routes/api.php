<?php

use App\Http\Controllers\MarqueController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function() {
      Route::get('logout', [AuthController::class, 'logout']);
      Route::get('user', [AuthController::class, 'user']);
    });
});

Route::prefix('voiture')->group(function () {
    Route::get('get-all', [VoitureController::class, 'getAll']);  
    Route::get('get-by-id/{id}', [VoitureController::class, 'getById']);
    Route::post('create', [VoitureController::class, 'create']);
    Route::put('update/{id}', [VoitureController::class, 'update']);
    Route::delete('delete/{id}', [VoitureController::class, 'delete']);
});

Route::prefix('marque')->group(function () {
    Route::get('get-all', [MarqueController::class, 'getAll']);  
    Route::get('get-by-id/{id}', [MarqueController::class, 'getById']);
    Route::post('create', [MarqueController::class, 'create']);  
    Route::put('update/{id}', [MarqueController::class, 'update']);
    Route::delete('delete/{id}', [MarqueController::class, 'delete']);
});