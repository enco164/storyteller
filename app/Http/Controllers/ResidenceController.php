<?php
namespace App\Http\Controllers;

use App\Residence;
use App\Transformers\ResidenceTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ResidenceController extends ApiController
{
    protected $residenceTransformer;

    /**
     * ResidenceController constructor.
     * @param $residenceTransformer
     */
    public function __construct(ResidenceTransformer $residenceTransformer)
    {
        $this->residenceTransformer = $residenceTransformer;
    }

    public function index()
    {
        return Residence::all();
    }

    public function store(Request $request)
    {

        if (!Input::get('state') and !Input::get('city')) {
            return $this->respondParametersFailed('State or City missing');
        }
        $schema = Residence::create($request->all());

        return response()->json($schema);
    }

    public function show($id)
    {
        $schema = Residence::find($id);

        if(!$schema) {
            return $this->respondNotFound('Residence does not exist');
        }

        return response()->json($schema);
    }

    public function update(Request $request, $id)
    {
        $schema = Residence::find($id);
        if (!$schema) {
            return $this->respondWithError("Residence does not exist.");
        }

        $schema->fill($request->all());
        $schema->save();

        return response()->json($schema);
    }

    public function destroy($id)
    {
        $schema = Residence::find($id);
        if (!$schema) {
            return $this->respondWithError("Residence does not exist.");
        }
        $schema->delete();
        return response()->json(["message" => 'Residence successfully deleted.']);
    }
}