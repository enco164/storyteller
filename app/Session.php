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

    public function pictureBook()
    {
        return $this->belongsTo('App\PictureBook', 'pictureBook_id');
    }

    public function transcripts()
    {
        return $this->hasMany('App\Transcript');
    }
}
