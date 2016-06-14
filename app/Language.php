<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use \Eloquence\Behaviours\CamelCasing;
    
    protected $table = 'languages';

    protected $fillable =[
        'language_name'
    ];

    public function kidsMother(){
        return $this->hasMany('App\Kid');
    }
    public function kidsFather(){
        return $this->hasMany('App\Kid');
    }
    public function kidsSchool(){
        return $this->hasMany('App\Kid');
    }
    public function kidsAdditionalSchool(){
        return $this->hasMany('App\Kid');
    }
    
}
