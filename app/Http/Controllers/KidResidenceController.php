<?php
/**
 * Created by PhpStorm.
 * User: Nikola
 * Date: 16/6/2016
 * Time: 6:23 PM
 */

namespace App\Http\Controllers;

use App\Kid;
use App\Residence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class KidResidenceController extends ApiController
{
    public function store(Request $request, $kidId)
    {
        $kid = Kid::find($kidId);
        if(Input::get('id'))
        {
            $kid->residences()->attach(Input::get('id'));

        }
        else
        {
            if (!Input::get('state') and !Input::get('city')) {
                return $this->respondParametersFailed('State or City missing');
            }
            $residence = Residence::create($request->all());
            $kid->residences()->attach($residence['id']);
        }
        $kid->load('residences');

        return $kid;
    }

    public function destroy($kidId, $residenceId)
    {
        $kid = Kid::find($kidId);
        $kid->residences()->detach($residenceId);
        $kid->load('residences');
        return $kid;
    }

}
