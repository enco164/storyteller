<?php
namespace App\Http\Controllers;

use App\AnnotationSchemas;
use App\Transformers\AnnotationSchemaTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class AnnotationSchemaController extends ApiController
{
    protected $annotationSchemaTransformer;

    /**
     * AnnotationSchemaController constructor.
     * @param $annotationSchemaTransformer
     */
    public function __construct(AnnotationSchemaTransformer $annotationSchemaTransformer)
    {
        $this->annotationSchemaTransformer = $annotationSchemaTransformer;
    }

    public function index()
    {
        return AnnotationSchemas::all();
    }

    public function store(Request $request)
    {

        if (!Input::get('title') and !Input::get('description')) {
            return $this->respondParametersFailed('First Name or Last Name missing');
        }
        $schema = AnnotationSchemas::create($request->all());

        return response()->json($schema);
    }

    public function show($id)
    {
        $schema = AnnotationSchemas::find($id);

        if(!$schema) {
            return $this->respondNotFound('Annotation schema does not exist');
        }

        return response()->json($schema);
    }

    public function update(Request $request, $id)
    {
        $schema = AnnotationSchemas::find($id);
        if (!$schema) {
            return $this->respondWithError("Annotation schema does not exist.");
        }

        $schema->fill($request->all());
        $schema->save();

        return response()->json($schema);
    }

    public function destroy($id)
    {
        $schema = AnnotationSchemas::find($id);
        if (!$schema) {
            return $this->respondWithError("Annotation schema does not exist.");
        }
        $schema->delete();
        return response()->json(["message" => 'Annotation schema successfully deleted.']);
    }

}
