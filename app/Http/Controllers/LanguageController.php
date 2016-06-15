<?php
/**
 * Created by PhpStorm.
 * User: Nikola
 * Date: 13/6/2016
 * Time: 7:32 PM
 */
namespace App\Http\Controllers;

use App\Language;
use App\Transformers\LanguageTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class LanguageController extends ApiController
{
    protected $languageTransformer;

    /**
     * LanguageController constructor.
     * @param $languageTransformer
     */
    public function __construct(LanguageTransformer $languageTransformer)
    {
        $this->languageTransformer = $languageTransformer;
    }

    public function index()
    {
        return Language::all();
    }

    public function store(Request $request)
    {

        if (!Input::get('languageName')) {
            return $this->respondParametersFailed('Language name missing');
        }
        $language = Language::create($request->all());

        return response()->json($language);
    }

    public function show($id)
    {
        $language = Language::find($id);

        if(!$language) {
            return $this->respondNotFound('Language does not exist');
        }

        return response()->json($language);
    }

    public function update(Request $request, $id)
    {
        $language = Language::find($id);
        if (!$language) {
            return $this->respondWithError("Language does not exist.");
        }

        $language->fill($request->all());
        $language->save();

        return response()->json($language);
    }

    public function destroy($id)
    {
        $language = Language::find($id);
        if (!$language) {
            return $this->respondWithError("Language does not exist.");
        }
        $language->delete();
        return response()->json(["message" => 'Language successfully deleted.']);
    }
}