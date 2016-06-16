<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 11.6.16.
 * Time: 13.23
 */

namespace App\Http\Controllers;


use App\Scene;
use App\SceneTranscript;
use App\Session;
use Illuminate\Http\Request;

class SceneTranscriptsController extends ApiController
{

    public function index() {
        return SceneTranscript::all();
    }

    public function show($id)
    {
        return SceneTranscript::find($id);
    }

    public function store(Request $request)
    {
        $session = Session::find($request->get('sessionId'));
        if (!$session) {
            $this->respondNotFound('Session not found');
        }

        $scene = Scene::find($request->get('sceneId'));
        if (!$scene) {
            $this->respondNotFound('Scene not found');
        }

        $sceneTranscript = SceneTranscript::create($request->all());
        $sceneTranscript->session()->associate($session);
        $sceneTranscript->scene()->associate($scene);
        $sceneTranscript->save();
        return $sceneTranscript;
    }

    public function destroy($id)
    {
        $sceneTranscript = SceneTranscript::find($id);
        if (!$sceneTranscript) {
            return $this->respondWithError("SceneTranscript does not exist.");
        }
        $sceneTranscript->delete();
        return response()->json(["message" => 'SceneTranscript successfully deleted.']);
    }
}