<?php
/**
 * Created by PhpStorm.
 * User: milan
 * Date: 21.6.16.
 * Time: 02.07
 */

namespace App\Http\Controllers;


use App\AudioRecording;
use App\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class SessionsRecordingsController extends ApiController
{
    public function index($sessionId)
    {
        $session = Session::find($sessionId);
        if (!$session) {
            $this->respondNotFound('Session not found');
        }
        return $session->load('audioRecording');
    }

    public function store(Request $request, $sessionId)
    {
        $session = Session::find($sessionId);
        if (!$session) {
            $this->respondNotFound('Session not found');
        }
        if(! $request->get('id')){
            $recording = AudioRecording::create($request->all());
            $session->fill(array('audioRecordingId' => $recording->id));
            $session->save();
        }
        else {
            $session->fill(array('audioRecordingId' => $request->get('id')));
            $session->save();
            $recording = AudioRecording::find($request->get('id'));
        }

        $recording->load('media');
        return $recording;
    }
}