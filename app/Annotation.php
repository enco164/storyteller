<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Annotation extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'name',
        'comment',
        'startIndex',
        'endIndex'
    ];

    public function sceneTranscript() {
        return $this->belongsTo('App\SceneTranscript');
    }

    public function transcript()
    {
        return $this->belongsTo('App\Transcript');
    }
}
