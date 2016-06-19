<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transcript extends Model
{
    use \Eloquence\Behaviours\CamelCasing;
    protected $fillable = [
        'sessionId', 'annotationSchemaId', 'title'
    ];

    public function session()
    {
        return $this->belongsTo('App\Session', 'session_id');
    }

    public function annotationSchema()
    {
        return $this->belongsTo('App\AnnotationSchemas', 'annotationSchema_id');
    }
}
