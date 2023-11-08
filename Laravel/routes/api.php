<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ComunicadoController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('comunicados')->group(function () {
    Route::get('/', [ComunicadoController::class, 'index']);
    Route::post('/', [ComunicadoController::class, 'store']);
    Route::get('/{id}', [ComunicadoController::class, 'show']);
    Route::put('/{id}', [ComunicadoController::class, 'update']);
    Route::delete('/{id}', [ComunicadoController::class, 'destroy']);
});

Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::get('/reservas', [ReservaController::class, 'index']);
Route::post('reservas', [ReservaController::class, 'store']);
Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);
Route::get('/users', [UserController::class, 'index']);

Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});