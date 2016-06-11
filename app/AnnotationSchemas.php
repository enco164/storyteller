<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnnotationSchemas extends Model
{
    protected $table = 'annotationSchemas';

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
}
