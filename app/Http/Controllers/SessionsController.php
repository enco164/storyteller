<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 11.6.16.
 * Time: 12.08
 */

namespace App\Http\Controllers;

use App\SceneTranscript;
use App\Session;
use Illuminate\Http\Request;

class SessionsController extends ApiController
{

    public function index()
    {
        return Session::with('sceneTranscripts')->get();
    }

    public function store(Request $request) {
        $session = Session::create();

        $sceneTranscipJsonList = $request->get('sceneTranscripts');
        foreach ($sceneTranscipJsonList as &$sceneTranscriptJson) {
            $session->sceneTranscripts()->save(new SceneTranscript($sceneTranscriptJson));
        }

        return $session;
    }

    public function update(Request $request) {

//        return PictureBook::all();
    }

    public function destroy() {

    }

}