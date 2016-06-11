<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 11.6.16.
 * Time: 13.23
 */

namespace App\Http\Controllers;


use App\SceneTranscript;
use Illuminate\Http\Request;

class SceneTranscriptsController extends ApiController
{

    public function index() {
        return SceneTranscript::all();
    }

    public function store(Request $request) {
        return SceneTranscript::create($request->all());
    }
}