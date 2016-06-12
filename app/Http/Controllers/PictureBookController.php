<?php
namespace App\Http\Controllers;

use App\PictureBook;
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
        return PictureBook::all();
    }

    public function store(Request $request)
    {

        if (!Input::get('title') and !Input::get('authors')
            and !Input::get('publisher') and !Input::get('yearOfPublishing')) {
            return $this->respondParametersFailed('Parameter is missing');
        }
        $schema = PictureBook::create($request->all());

        return response()->json($schema);
    }

    public function show($id)
    {
        $schema = PictureBook::find($id);

        if(!$schema) {
            return $this->respondNotFound('Picture book does not exist');
        }

        return response()->json($schema);
    }

    public function update(Request $request, $id)
    {
        $schema = PictureBook::find($id);
        if (!$schema) {
            return $this->respondWithError("Picture book does not exist.");
        }

        $schema->fill($request->all());
        $schema->save();

        return response()->json($schema);
    }

    public function destroy($id)
    {
        $schema = PictureBook::find($id);
        if (!$schema) {
            return $this->respondWithError("Picture book does not exist.");
        }
        $schema->delete();
        return response()->json(["message" => 'Picture book successfully deleted.']);
    }

}
