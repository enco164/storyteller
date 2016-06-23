<?php
namespace App\Http\Controllers;
use App\Media;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

/**
 * Created by PhpStorm.
 * User: Darko
 * Date: 14/6/2016
 * Time: 10:27 AM
 */

class MediaController extends ApiController {

    public function index()
    {
        return Media::all()->load('recording', 'scene');
    }

    public function show($id)
    {
        $media = Media::find($id);
        if (!$media) {
            return $this->respondNotFound('Media does not exist.');
        }
        return $media->load('recording', 'scene');
    }

    public function store() {
        $input = Input::file('file');

        $currentDate = date("Y/m");
        $path = public_path()."/multi_media/".$currentDate;

        $pathForDB = "/multi_media/".$currentDate;

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $fileName = $input->getClientOriginalName();
        $fileName = str_replace(" " , "_" , $fileName);

        $fileNameHolder = $fileName;

        while(1)
        {
            if(file_exists($path."/".$fileName))
            {
                $fileNameParts = explode(".", $fileNameHolder);
                $fileNameParts[0] .= "_".rand();
                $fileName = $fileNameParts[0].".".$fileNameParts[1];
            }
            else
            {
                $input->move($path, $fileName);
                break;
            }
        }

        $pathForDB = $pathForDB."/".$fileName;
        $media = Media::create(['fileName' => $fileName, 'path' => $pathForDB]);
        $media->save();

        return response()->json($media);
    }

    public function destroy($id)
    {
        $media = Media::find($id);
        if (!$media) {
            return $this->respondWithError("Media does not exist.");
        }
        if(file_exists($media->path))
            unlink($media->path);
        $media->delete();
        return response()->json(["message" => 'Media successfully deleted.']);
    }
}