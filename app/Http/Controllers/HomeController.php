<?php
/**
 * Created by PhpStorm.
 * User: enco
 * Date: 16.5.16.
 * Time: 23.44
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\File;

class HomeController extends Controller
{
    public function index()
    {
        //return public_path().'/client_hottowel/src/client/index.html';
        return File::get(public_path().'/app.html');
    }

    public function hopa()
    {
        return 'hopa';
    }
}