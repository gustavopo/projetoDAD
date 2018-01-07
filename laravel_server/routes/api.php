<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'LoginControllerAPI@login');
Route::middleware('auth:api')->post('logout','LoginControllerAPI@logout');


//rota teste do login
Route::middleware('auth:api')->get('teste', function () {
 return response()->json(['msg'=>'Só um teste'], 200);
});


//----
Route::get('users', 'UserControllerAPI@getUsers');
//Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::post('users', 'UserControllerAPI@store');
Route::put('users/{id}', 'UserControllerAPI@update');
Route::delete('users/{id}', 'UserControllerAPI@delete');
Route::post('register','UserControllerAPI@store');
Route::get('verifyEmail','UserControllerAPI@verifyEmail')->name('verifyEmail');
Route::get('verify/{email}/{verifyToken}', 'UserControllerApi@sendEmailDone')->name('sendEmailDone');

//GetAuthenthicatedUser
Route::get('user', function(Request $request)
{    return $request->user();
})->middleware('auth:api');

Route::get('/authUser', 'UserControllerApi@getAuthUser');

Route::post('login', 'LoginControllerAPI@login');
Route::middleware('auth:api')->post('logout','LoginControllerAPI@logout');


Route::get('games', 'GameControllerAPI@index');
Route::get('games/lobby', 'GameControllerAPI@lobby');
Route::get('games/status/{status}', 'GameControllerAPI@gamesStatus');
Route::get('games/{id}', 'GameControllerAPI@getGame');
Route::post('games', 'GameControllerAPI@store');
Route::patch('games/{id}/join-start', 'GameControllerAPI@joinAndStart');
Route::patch('games/{id}/endgame/{winner}', 'GameControllerAPI@endgame');
