<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = [
        'sceneTranscripts'
    ];

    public function sceneTranscripts() {
        return $this->hasMany('App\SceneTranscript');
    }
}
