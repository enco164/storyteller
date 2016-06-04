<?php
/**
 * Created by PhpStorm.
 * User: enco
 * Date: 26.5.16.
 * Time: 00.34
 */

namespace App\Http\Controllers;


use App\Http\Requests\Request;
use App\Kid;
use Illuminate\Support\Facades\Input;

class KidsController extends ApiController
{
    protected $kidTransformer;

    /**
     * KidsController constructor.
     * @param $kidTransformer
     */
    public function __construct($kidTransformer)
    {
        $this->kidTransformer = $kidTransformer;
    }

    public function index()
    {
        $limit = Input::get('limit') ?: 3;
        $limit = ($limit <= 20) ? $limit : 20;
        $kids = Kid::orderBy('first_name', 'asc');
        /*  i can just do this:
         *    return $kids->paginate($limit);
         *  but it will not be transformed
        */
        $kids = $kids->paginate($limit);
        //$lessons = Lesson::all(); // Really bad practice
        return $this->respond()
            ->json($this->lessonTransformer->transformCollection($kids->all()))
            ->header('x-total-count', $kids->total())
            ->header('x-total-pages', $kids->lastPage())
            ->header('previous_page', $kids->previousPageUrl())
            ->header('current_page', $kids->currentPage())
            ->header('next_page', $kids->nextPageUrl())
            ->header('limit', $kids->perPage())
            ->header('links', $kids->links());
    }

    public function store(Request $request)
    {
        if (!Input::get('firstName') or !Input::get('lastName')) {
            return $this->respondParametersFailed('First Name or Last Name missing');
        }
        Kid::create($request->all());
        return $this->respondCreated('Kid successfully created.');
    }

    public function show($id)
    {
        $kid = Kid::find($id);
        if ( ! $kid)
        {
            return $this->respondNotFound('Kid does not exist.');
        }
        return $this->respond()-json(
            $this->kidTransformer->transform($kid)
        );
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

}