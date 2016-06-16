<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transcript extends Model
{
    public function session()
    {
        return $this->belongsTo('App\Session', 'session_id');
    }

    public function annotationSchema()
    {
        return $this->belongsTo('App\AnnotationSchemas', 'annotationSchema_id');
    }
}
