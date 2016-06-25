<?php
/**
 * Created by PhpStorm.
 * User: milan
 * Date: 20.6.16.
 * Time: 20.00
 */
namespace App\Http\Controllers;


use App\AudioRecording;
use App\Media;
use Illuminate\Http\Request;
use App\Transformers\AudioRecordingTransformer;

class RecordingsController extends ApiController
{
    protected $audioRecordingTransformer;

    /**
     * AudioRecordingController constructor.
     * @param $audioRecordingTransformer
     */
    public function __construct(AudioRecordingTransformer $audioRecordingTransformer)
    {
        $this->audioRecordingTransformer = $audioRecordingTransformer;
    }

    public function index()
    {
        return AudioRecording::all()->load('media', 'session');
    }

    public function store(Request $request)
    {
        $recording = AudioRecording::create($request->all());

        return response()->json($recording);
    }

    public function show($id)
    {
        $recording = AudioRecording::find($id);

        if(!$recording) {
            return $this->respondNotFound('Audio Recording does not exist');
        }
        $recording->load('media', 'session');
        return response()->json($recording);
    }

    public function update(Request $request, $id)
    {
        $recording = AudioRecording::find($id);
        if (!$recording) {
            return $this->respondWithError("Audio Recording does not exist.");
        }

        $recording->fill($request->all());
        $recording->save();

        return response()->json($recording);
    }

    public function destroy($id)
    {
        $recording = AudioRecording::find($id);
        if (!$recording) {
            return $this->respondWithError("Audio Recording does not exist.");
        }
        if(file_exists(public_path()."/".$recording->media->path))
            unlink(public_path()."/".$recording->media->path);
        $recording->delete();
        return response()->json(["message" => 'Audio Recording successfully deleted.']);
    }

}
