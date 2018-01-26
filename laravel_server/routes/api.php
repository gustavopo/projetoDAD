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
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::post('login', 'LoginControllerAPI@login');
Route::middleware('auth:api')->post('logout','LoginControllerAPI@logout');

//rota teste do login
Route::middleware('auth:api')->get('teste', function () {
 return response()->json(['msg'=>'Só um teste'], 200);
});

Route::middleware('auth:api')->get('user', function () {
    return response()->json();
});


//----
Route::get('users', 'UserControllerAPI@getUsers');

Route::get('user-data', function () {
    //dd(request());
    return request()->user();
})->middleware('auth:api');

Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::put('users/block/{id}','UserControllerAPI@block');
Route::put('users/unblock/{id}','UserControllerAPI@unblock');
Route::post('users', 'UserControllerAPI@store');
Route::put('users/{id}', 'UserControllerAPI@update');
Route::delete('users/{id}', 'UserControllerAPI@delete');
Route::post('register','UserControllerAPI@store');
Route::get('verifyEmail','UserControllerAPI@verifyEmail')->name('verifyEmail');
Route::get('verify/{email}/{verifyToken}', 'UserControllerApi@sendEmailDone')->name('sendEmailDone');
Route::get('sendRegisterEmail','UserControllerAPI@sendRegisterEmail');
Route::get('verifyEmail','UserControllerAPI@verifyEmailFirst')->name('verifyEmail');
Route::get('sendMail','MailController@sendMail');

/** FIRST TRY BUT WRONG
Route::post('forgot-password/email', 'Auth\ForgotPasswordController@getResetToken');
Route::post('forgot-password/reset', 'Auth\ResetPasswordController@reset');
**/

Route::get('password/reset','Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email','Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}','Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset','Auth\ResetPasswordController@reset');


//Change Password
Route::put('users/changePassword/{id}', 'UserControllerAPI@changePassword');


//GetAuthenthicatedUser
Route::middleware('auth:api')->get('user', function(Request $request)
{
    return $request->user();
})->middleware('auth:api');

Route::get('/authUser', 'UserControllerApi@getAuthUser');

//Images
Route::get('images', 'ImageControllerAPI@getImages');
Route::delete('images/{id}', 'ImageControllerAPI@delete');
Route::post('images/storeImage','ImageControllerAPI@store');




//Games

Route::get('games', 'GameControllerAPI@index');
Route::get('games/lobby', 'GameControllerAPI@lobby');
Route::get('games/status/{status}', 'GameControllerAPI@gamesStatus');
Route::get('games/{id}', 'GameControllerAPI@getGame');
Route::get('gamescount', 'GameControllerAPI@numberOfGames');
Route::post('games', 'GameControllerAPI@store');
Route::patch('games/{id}/join-start', 'GameControllerAPI@joinAndStart');
Route::put('games/{id}/endgame/{winner}', 'GameControllerAPI@endgame');

//statistics

Route::get('allyourmultiplayergames/{id}', 'GameControllerAPI@allYourMultiWins');
Route::get('allyoursingleplayergames/{id}', 'GameControllerAPI@allYourSingleWins');
Route::get('allyourgames/{id}', 'GameControllerAPI@allYourGames');
Route::get('topthree', 'GameControllerAPI@topThreePlayers');
Route::get('totalgamesplayed', 'GameControllerAPI@totalgamesplayed');
Route::get('multiplayergames', 'GameControllerAPI@multiplayergames');
Route::get('singleplayergames', 'GameControllerAPI@singleplayergames');