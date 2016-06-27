<?php
namespace App\Http\Controllers;

use App\Annotation;
use App\Transformers\AnnotationSchemaTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class AnnotationController extends ApiController
{

    public function index()
    {
        return Annotation::all();
    }

    public function destroy($id)
    {
        $annotation = Annotation::find($id);
        if (!$annotation) {
            return $this->respondWithError("Annotation schema does not exist.");
        }
        $annotation->delete();
        return response()->json(["message" => 'Annotation successfully deleted.']);
    }

}
