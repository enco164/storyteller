<?php
/**
 * Created by PhpStorm.
 * User: Nikola
 * Date: 16/6/2016
 * Time: 6:23 PM
 */

namespace App\Http\Controllers;

use App\Kid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class KidResidenceController extends ApiController
{
    public function store(Request $request, $kidId)
    {
        $kid = Kid::find($kidId);
        $kid->residences()->attach(Input::get('id'));
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
