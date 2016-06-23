<?php
namespace App\Http\Controllers;

use App\PictureBook;
use App\Scene;
use App\Transformers\PictureBookTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class PictureBookController extends ApiController
{
    protected $pictureBookTransformer;

    /**
     * PictureBookTransformer constructor.
     * @param $pictureBookTransformer
     */
    public function __construct(PictureBookTransformer $pictureBookTransformer)
    {
        $this->pictureBookTransformer = $pictureBookTransformer;
    }

    public function index()
    {
        return PictureBook::all()->load('scenes', 'scenes.media');
    }

    public function store(Request $request)
    {

        if (!Input::get('title') and !Input::get('authors')
            and !Input::get('publisher') and !Input::get('yearOfPublishing')) {
            return $this->respondParametersFailed('Parameter is missing');
        }

        $picBook = PictureBook::create($request->all());

        return $picBook;
    }

    public function show($id)
    {
        $picBook = PictureBook::find($id);

        if(!$picBook) {
            return $this->respondNotFound('Picture book does not exist');
        }

        return $picBook->load('scenes', 'scenes.media');
    }

    public function update(Request $request, $id)
    {
        $picBook = PictureBook::find($id);
        if (!$picBook) {
            return $this->respondWithError("Picture book does not exist.");
        }

        $picBook->fill($request->all());
        $picBook->save();
        
        return response()->json($picBook);
    }

    public function destroy($id)
    {
        $picBook = PictureBook::find($id);
        if (!$picBook) {
            return $this->respondWithError("Picture book does not exist.");
        }
        $picBook->delete();
        return response()->json(["message" => 'Picture book successfully deleted.']);
    }

}
