<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 4.6.16.
 * Time: 16.55
 */

namespace App\Http\Controllers;

use App\Kid;
use App\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Transformers\KidTransformer;


class KidsController extends ApiController
{
    protected $kidTransformer;

    /**
     * KidsController constructor.
     * @param $kidTransformer
     */
    public function __construct(KidTransformer $kidTransformer)
    {
        $this->kidTransformer = $kidTransformer;
    }

    public function index()
    {
        $kids = Kid::all();
//        $limit = Input::get('limit') ?: 30;
//        $limit = ($limit <= 20) ? $limit : 20;
//        $kids = Kid::orderBy('first_name', 'asc');
        foreach ($kids as $kid){
            $kid->load('languageMother', 'languageFather', 'languageSchool', 'languageAdditionalSchool');
        }
        /*  i can just do this:
         *    return $kids->paginate($limit);
         *  but it will not be transformed
        */
        //$kids = $kids->paginate($limit);
        //$lessons = Lesson::all(); // Really bad practice
        return response()
            ->json($kids);
//            ->header('x-total-count', $kids->total())
//            ->header('x-total-pages', $kids->lastPage())
//            ->header('previous_page', $kids->previousPageUrl())
//            ->header('current_page', $kids->currentPage())
//            ->header('next_page', $kids->nextPageUrl())
//            ->header('limit', $kids->perPage())
//            ->header('links', $kids->links());
    }

    public function store(Request $request)
    {
        if (!Input::get('firstName') or !Input::get('lastName')) {
            return $this->respondParametersFailed('First Name or Last Name missing');
        }
        
        $kid = Kid::create($request->all());
        $kid->save();
        //$kid->languageMother()->create($request->get('motherLanguage'));
        //return $kid->load('languageMother');
        
//        $kid = Kid::create();
//        $languageMother = $request->get('motherLanguage');
//        $languageFather = $request->get('fatherLanguage');
//        $languageSchool = $request->get('schoolLanguage');
//        $languageAdditionalSchool = $request->get('additionalSchoolLanguage');

//        $languageMother = $kid->languageMother->languageName;
//        $languageFather = $kid->languageFather->languageName;
//        $languageSchool = $kid->languageSchool->languageName;
//        $languageAdditionalSchool = $kid->languageAdditionalSchool->languageName;
        
//        $kid->motherLanguage()->save(new Language($languageMother));
//        $kid->fatherLanguage()->save(new Language($languageFather));
//        $kid->schoolLanguage()->save(new Language($languageSchool));
//        $kid->additionalSchoolLanguage()->save(new Language($languageAdditionalSchool));
        $kid->load('languageMother', 'languageFather', 'languageSchool', 'languageAdditionalSchool');
        return response()->json($kid);
    }

    public function show($id)
    {
        $kid = Kid::find($id);
        if (!$kid) {
            return $this->respondNotFound('Kid does not exist.');
        }
        $kid->load('languageMother', 'languageFather', 'languageSchool', 'languageAdditionalSchool');
        return response()->json($kid);
    }

    public function update(Request $request, $id)
    {
        $kid = Kid::find($id);
        if (!$kid) {
            return $this->respondWithError("Kid does not exist.");
        }

        $kid->fill($request->all());
        $kid->save();
        $kid->load('languageMother', 'languageFather', 'languageSchool', 'languageAdditionalSchool');
        return response()->json($kid);
    }

    public function destroy($id)
    {
        $kid = Kid::find($id);
        if (!$kid) {
            return $this->respondWithError("Kid does not exist.");
        }
        $kid->delete();
        return response()->json(["message" => 'Kid successfully deleted.']);
    }

}
