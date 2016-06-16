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

class KidResidenceController extends ApiController
{
    public function store(Request $request, $kid_id, $residence_id)
    {
        $kid = Kid::find($kid_id);
        $kid->residences()->attach($residence_id);

        return $kid->load('residences');
    }

}
