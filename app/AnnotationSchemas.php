<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnnotationSchemas extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable =[
        'title',
        'description',
        'blue',
        'green',
        'red',
        'aqua',
        'pink',
        'yellow',
        'orange'
    ];
    
    public function transcript(){
        $this->hasMany('App\Transcript');
    }
}
