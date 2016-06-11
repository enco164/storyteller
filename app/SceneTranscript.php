<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SceneTranscript extends Model
{
    protected $table = 'sceneTranscripts';

    protected $fillable = [
        'text'
    ];

    public function session() {
        return $this->belongsTo('App\Session');
    }

    public function annotations() {
        return $this->hasMany('App\Annotation');
    }
}
