<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kid extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'firstName',
        'lastName',
        'yearOfBirth',
        'cityOfBirth',
        'gender',
        'educationMother',
        'educationFather',
        'stateOfBirth',
        'languageMotherId',
        'languageFatherId',
        'languageSchoolId',
        'languageAdditionalSchoolId'];
    
    public function languageMother() {
        return $this->belongsTo('App\Language', 'languageMother_id');
    }
    public function languageFather() {
        return $this->belongsTo('App\Language', 'languageFather_id');
    }
    public function languageSchool() {
        return $this->belongsTo('App\Language', 'languageSchool_id');
    }
    public function languageAdditionalSchool() {
        return $this->belongsTo('App\Language', 'languageAdditionalSchool_id');
    }

    //Residences that belong to kid
    public function residences()
    {
        return $this->belongsToMany('App\Residence','kids_residences','kid_id','residence_id');
    }
}
