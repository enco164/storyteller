<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kid extends Model
{
    protected $fillable = ['firstName',
        'lastName',
        'yearOfBirth',
        'cityOfBirth',
        'gender',
        'educationMother',
        'educationFather',
        'stateOfBirth',
        'languageMotherFK',
        'languageFatherFK',
        'languageSchoolFK',
        'languageAdditionalSchoolFK'];
}
