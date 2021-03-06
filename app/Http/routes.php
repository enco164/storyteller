<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::post('auth/login', 'AuthController@login');
Route::post('auth/signup', 'AuthController@signup');

// API Routes.
Route::get('api/me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
Route::put('api/me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);


Route::group(['prefix' => 'api', 'middleware' => 'auth'], function () {
    Route::resource('kids', 'KidsController');
    Route::resource('sessions', 'SessionsController');
    Route::resource('scene_transcripts', 'SceneTranscriptsController');
    Route::resource('annotation_schemas', 'AnnotationSchemaController');
    Route::resource('residences', 'ResidenceController');
    Route::resource('languages', 'LanguageController');
    Route::resource('picture_books', 'PictureBookController');
    Route::resource('scenes', 'ScenesController');
    Route::resource('picture_books.scenes', 'PictureBookSceneController');
    Route::resource('sessions.scene_transcripts', 'SessionsSceneTranscriptsController');
    Route::resource('kids.residences', 'KidResidenceController');
    Route::resource('sessions.transcripts', 'SessionsTranscriptsController');
    Route::resource('sessions.recordings', 'SessionsRecordingsController');
    Route::resource('recordings', 'RecordingsController');
    Route::resource('media', 'MediaController');
    Route::resource('annotations', 'AnnotationController');
});

// If there is not requested route return index.html and let Angular display 404 page
//Route::get('{all}', function () {
//    return File::get(public_path().'/index.html');
//});
Route::any('{path?}', function()
{
    return File::get(public_path() . '/index.html');
})->where("path", ".+");