<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

/**
 * Created by PhpStorm.
 * User: Nikola
 * Date: 14/6/2016
 * Time: 10:27 AM
 */

class PhotosController extends ApiController {

    public function store() {

        $input = Input::file('image');

        $fileName = $input->getClientOriginalName();

        $fileName = str_replace(" " , "_" , $fileName);

        $image = Image::make($input);

        File::exists(public_path()) or File::makeDirectory(user_photos_path());

        $image->save(user_photos_path().$fileName);
        $width = $image->width();
        $height = $image->height();

        $measure = ($width > $height) ? $height : $width;

        $image->crop($measure, $measure);
        $image->save(user_photos_path().'large-'.$fileName);
        $image->resize(200, 200);
        $image->save(user_photos_path().'tn-'.$fileName);
        $image->blur(15);
        $image->save(user_photos_path().'blur-'.$fileName);

        Photos::firstOrCreate(array('userid' => Auth::id()));

        $lawly = Photos::where('userid', '=', Auth::id())->first();

        // change the attribute
        $lawly->fileName = 'large-'.$fileName;
        $lawly->thumbnailName = 'tn-'.$fileName;
        $lawly->title = Auth::user()->username;

        // save to our database
        $lawly->save();

        echo "Success-Your profile picture has been changed.";

    }

    public function create() {

        echo "wrong route";

    }

}