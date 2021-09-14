<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', 'API\AuthController@register');
Route::post('/login', 'API\AuthController@login')->name('login');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/users', 'API\AuthController@users');
    Route::post('/logout', 'API\AuthController@logout')->name('logout');
});
