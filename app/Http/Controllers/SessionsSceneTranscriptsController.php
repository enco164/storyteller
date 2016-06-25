<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 16.6.16.
 * Time: 18.54
 */

namespace App\Http\Controllers;

use App\SceneTranscript;
use App\Session;
use Illuminate\Http\Request;

class SessionsSceneTranscriptsController extends ApiController
{
    public function index($sessionId)
    {
        $session = Session::find($sessionId);
        if (!$session) {
            $this->respondNotFound('Session not found');
        }
        return $session->sceneTranscripts()->get()->load('scene', 'scene.media');
    }

    public function show(Request $request, $sessionId, $sceneTranscriptId)
    {
        return $sceneTranscriptId;
    }

    public function update(Request $request, $sessionId, $sceneTranscriptId)
    {

        $session = Session::find($sessionId);
        if (!$session) {
            $this->respondNotFound('Session not found');
        }

        $sceneTranscript = $session->sceneTranscripts()->get()->find($sceneTranscriptId);
        if (!$sceneTranscript) {
            $this->respondNotFound('SceneTranscript not found');
        }

        $sceneTranscript->fill($request->all());
        $sceneTranscript->save();
        return $sceneTranscript->load('scene');
    }
}