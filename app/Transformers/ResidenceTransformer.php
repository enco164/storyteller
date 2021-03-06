<?php
namespace App\Transformers;
use App\Residence;
/**
 * Created by PhpStorm.
 * User: Nikola
 * Date: 12/6/2016
 * Time: 11:51 AM
 */
class ResidenceTransformer extends Transformer
{

    /**
     * @param Residence $residence
     * @return array
     */
    public function transform($residence)
    {
        return [
            'state' => $residence['state'],
            'city' => $residence['city']
        ];
    }
}