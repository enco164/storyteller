<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 11.6.16.
 * Time: 12.08
 */

namespace App\Http\Controllers;

use App\Kid;
use App\PictureBook;
use App\SceneTranscript;
use App\Session;
use Illuminate\Http\Request;

class SessionsController extends ApiController
{

    public function index()
    {
        return Session::with('kid', 'pictureBook')->get();
    }

    public function store(Request $request) {
        $kidId = $request->get('kidId');
        $pictureBookId = $request->get('pictureBookId');
        if (!$kidId || !$pictureBookId) {
            return $this->respondParametersFailed('Kid or PictureBook missing.');
        }

        $kid = Kid::find($kidId);
        $pictureBook = PictureBook::find($pictureBookId);
        if ($kid === NULL || $pictureBook === NULL) {
            return $this->respondNotFound('Kid or Picture Book not found');
        }

        // Creating session
        $session = Session::create();
        $session->kid()->associate($kid);
        $session->pictureBook()->associate($pictureBook);
        $session->save();

        //Creating sceneTranscript for every scene
        $scenes = $pictureBook->scenes()->get();
        foreach ($scenes as $scene) {
            $sceneTranscript = new SceneTranscript(['text' => '']);
            $sceneTranscript = $scene->sceneTranscripts()->save($sceneTranscript);
            $sceneTranscript = $session->sceneTranscripts()->save($sceneTranscript);
        }

        return $session->load('pictureBook', 'kid');
    }

    public function show($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return $this->respondNotFound('Session not found');
        }
        $session->load('kid', 'transcripts.annotationSchema', 'sceneTranscripts.scene', 'sceneTranscripts.annotations', 'audioRecording', 'audioRecording.media',
            'pictureBook.scenes');

        return $session;
    }

    public function update(Request $request) {

//        return PictureBook::all();
    }

    public function destroy($id) {
        $session = Session::find($id);
        if (!$session) {
            return $this->respondNotFound('Session not found');
        }
        $session->delete();
        return response()->json(["message" => 'Session successfully deleted.']);
    }

}