<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 11.6.16.
 * Time: 12.08
 */

namespace App\Http\Controllers;

use App\Annotation;
use App\Kid;
use App\PictureBook;
use App\SceneTranscript;
use App\Session;
use App\Transcript;
use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Config;

class SessionsController extends ApiController
{

    public function index()
    {
        return Session::with('kid', 'pictureBook')->get();
    }

    public function store(Request $request) {
        $jwt = explode(' ', $request->header('Authorization'))[1];

        $decoded = JWT::decode($jwt, Config::get('app.token_secret'), array('HS256'));
        $userId = $decoded->sub;


        $user = User::find($userId);

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
        $session->user()->associate($user);
        $session->save();

        //Creating sceneTranscript for every scene
        $scenes = $pictureBook->scenes()->get();
        foreach ($scenes as $scene) {
            $sceneTranscript = new SceneTranscript(['text' => '']);
            $sceneTranscript = $scene->sceneTranscripts()->save($sceneTranscript);
            $sceneTranscript = $session->sceneTranscripts()->save($sceneTranscript);
        }

        return $session->load('pictureBook', 'kid', 'user');
    }

    public function show($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return $this->respondNotFound('Session not found');
        }
        $session->load('kid', 'transcripts.annotationSchema', 'sceneTranscripts.scene', 'sceneTranscripts.annotations',
            'audioRecording', 'audioRecording.media', 'pictureBook.scenes', 'user');

        return $session;
    }

    public function update(Request $request, $id) {
        $session = Session::find($id);
        if (!$session) {
            return $this->respondNotFound('Session not found');
        }
        $sceneTranscripts = $request->get('sceneTranscripts');
        foreach ($sceneTranscripts as $sceneTranscript) {
            foreach ($sceneTranscript['annotations'] as $annotation) {
//                return $annotation;
                if (array_key_exists('id', $annotation)) {
                    $ann = Annotation::find($annotation['id']);
                    $ann->fill($annotation);
                    $ann->save();
                } else {
                    $ann = new Annotation($annotation);
                    $transcript = Transcript::find($annotation['transcriptId']);
                    $transcript->annotations()->save($ann);
                    $st = SceneTranscript::find($sceneTranscript['id']);
                    $st->annotations()->save($ann);
                }
            }
        }

        return $session->load('kid', 'transcripts.annotationSchema', 'sceneTranscripts.scene', 'sceneTranscripts.annotations',
            'audioRecording', 'audioRecording.media', 'pictureBook.scenes');
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