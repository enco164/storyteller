<?php
use App\Kid;

/**
 * Created by PhpStorm.
 * User: enco
 * Date: 26.5.16.
 * Time: 00.45
 */
class KidTransformer extends Transformer
{

    /**
     * @param Kid $kid
     * @return array
     */
    public function transform($kid)
    {
        return [
            'firstName' => $kid['first_name'],
            'lastName' => $kid['last_name'],
            'dateOfBirth' => $kid['date_of_birth'],
            'placeOfBirth' => $kid['place_of_birth'],
            'countryOfBirth' => $kid['country_of_birth'],
            'gender' => $kid['gender'],
            'fathersEducation' => $kid['fathers_education'],
            'mothersEducation' => $kid['mothers_education'],
        ];
    }
}