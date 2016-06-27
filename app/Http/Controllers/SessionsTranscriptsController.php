<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 16.6.16.
 * Time: 18.54
 */

namespace App\Http\Controllers;

use App\Transcript;
use App\Session;
use App\AnnotationSchemas;
use Illuminate\Http\Request;

class SessionsTranscriptsController extends ApiController
{
    public function index($sessionId)
    {
        $session = Session::find($sessionId);
        if (!$session) {
            $this->respondNotFound('Session not found');
        }
        return $session->transcripts()->get();
    }

    public function store(Request $request, $sessionId){

        $session = Session::find($sessionId);
        if (!$session) {
            $this->respondNotFound('Session not found');
        }
        $annotationSchemaId = $request->get('annotationSchemaId');
        $annotationSchema = AnnotationSchemas::find($annotationSchemaId);
        if (!$annotationSchema) {
            $this->respondNotFound('AnnotationSchema not found');
        }
        /*Uvezati ovde*/
        $session->transcripts()->create($request->all());

        $session->load(['transcripts' => function($query) use(&$transcriptId) {
            $query->where('id', '=', $transcriptId)->get();
        }]);
        $session->load(['sceneTranscripts.annotations' => function($query) use(&$transcriptId) {
            $query->where('annotations.transcript_id', '=', $transcriptId);
        }]);
        $session['sceneTranscripts']->load('scene.media');
        $session->load('kid', 'audioRecording.media', 'pictureBook.scenes.media');
        return $session;
    }

    public function show(Request $request, $sessionId, $transcriptId)
    {
        $session = Session::find($sessionId);
        if (!$session) {
            return $this->respondNotFound('Session not found');
        }
        $session->load(['transcripts' => function($query) use(&$transcriptId) {
            $query->where('id', '=', $transcriptId)->get();
        }]);
        $session->load(['sceneTranscripts.annotations' => function($query) use(&$transcriptId) {
            $query->where('annotations.transcript_id', '=', $transcriptId);
        }]);
        $session['sceneTranscripts']->load('scene.media');
        $session->load('kid', 'audioRecording.media', 'pictureBook.scenes');
        return $session;
    }

}