<?php
namespace App\Http\Controllers;

use App\Residence;
use App\Kid;
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
        $residence = Residence::create($request->all());

        return response()->json($residence);
    }

    public function show($id)
    {
        $residence = Residence::find($id);

        if(!$residence) {
            return $this->respondNotFound('Residence does not exist');
        }

        return response()->json($residence);
    }

    public function update(Request $request, $id)
    {
        $residence = Residence::find($id);
        if (!$residence) {
            return $this->respondWithError("Residence does not exist.");
        }

        $residence->fill($request->all());
        $residence->save();

        return response()->json($residence);
    }

    public function destroy($id)
    {
        $residence = Residence::find($id);
        if (!$residence) {
            return $this->respondWithError("Residence does not exist.");
        }
        $residence->delete();
        return response()->json(["message" => 'Residence successfully deleted.']);
    }
}