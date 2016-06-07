<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 4.6.16.
 * Time: 16.55
 */

namespace App\Http\Controllers;

use App\Kid;
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
        $limit = Input::get('limit') ?: 30;
        $limit = ($limit <= 20) ? $limit : 20;
        $kids = Kid::orderBy('firstName', 'asc');
        /*  i can just do this:
         *    return $kids->paginate($limit);
         *  but it will not be transformed
        */
        $kids = $kids->paginate($limit);
        //$lessons = Lesson::all(); // Really bad practice
        return response()
            ->json($kids->all());
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
        Kid::create($request->all());

        return response()->json(['message' => 'Kid successfully created.']);
    }

    public function show($id)
    {
        $kid = Kid::find($id);
        if ( ! $kid)
        {
            return $this->respondNotFound('Kid does not exist.');
        }

        return response()->json($kid);
    }

    public function update(Request $request, $id)
    {
        $kid = Kid::find($id);
        if (!$kid)
        {
            return $this->respondWithError("Kid does not exist.");
        }

        $kid->fill($request->all());
        $kid->save();
        return $kid;
    }

    public function destroy($id)
    {
        $kid = Kid::find($id);
        if (!$kid)
        {
            return $this->respondWithError("Kid does not exist.");
        }
        $kid->delete();
        return response()->json(["message" => 'Kid successfully deleted.']);
    }

}
