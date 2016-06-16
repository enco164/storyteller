<?php
namespace App\Http\Controllers;

use App\PictureBook;
use App\Scene;
use App\Transformers\SceneTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

/**
 * Created by PhpStorm.
 * User: milan
 * Date: 15.6.16.
 * Time: 23.51
 */

class ScenesController extends ApiController
{
    protected $sceneTransformer;

    /**
     * ScenesController constructor.
     * @param $sceneTransformer
     */
    public function __construct(SceneTransformer $sceneTransformer)
    {
        $this->sceneTransformer = $sceneTransformer;
    }

    public function index()
    {
        return Scene::all();
    }

    public function store(Request $request)
    {

        if (!Input::get('sceneNumber')) {
            return $this->respondParametersFailed('Scene number missing');
        }
        $scene = Scene::create($request->all());

        return response()->json($scene);
    }

    public function show($id)
    {
        $scene = Scene::find($id);

        if(!$scene) {
            return $this->respondNotFound('Scene does not exist');
        }

        return response()->json($scene);
    }

    public function update(Request $request, $id)
    {
        $scene = Language::find($id);
        if (!$scene) {
            return $this->respondWithError("Scene does not exist.");
        }

        $scene->fill($request->all());
        $scene->save();

        return response()->json($scene);
    }

    public function destroy($id)
    {
        $scene = Scene::find($id);
        if (!$scene) {
            return $this->respondWithError("Scene does not exist.");
        }
        $scene->delete();
        return response()->json(["message" => 'Scene successfully deleted.']);
    }
}