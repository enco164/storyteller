<?php
/**
 * Created by PhpStorm.
 * User: milan
 * Date: 16.6.16.
 * Time: 02.09
 */

namespace App\Http\Controllers;


use App\PictureBook;
use Illuminate\Http\Request;

class PictureBookSceneController extends ApiController
{

    public function index($picBookId){
        $pictureBook = PictureBook::find($picBookId);

        return $pictureBook->scenes()->get();
    }

    public function store(Request $request, $picBookId)
    {
        $pictureBook = PictureBook::find($picBookId);
        $pictureBook->scenes()->create($request->all());
        
        return $pictureBook->load('scenes', 'scenes.media');
    }
}