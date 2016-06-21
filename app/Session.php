<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'sceneTranscripts',
        'audioRecordingId'
    ];

    public function kid()
    {
        return $this->belongsTo('App\Kid');
    }

    public function sceneTranscripts() {
        return $this->hasMany('App\SceneTranscript');
    }

    public function pictureBook()
    {
        return $this->belongsTo('App\PictureBook');
    }

    public function transcripts()
    {
        return $this->hasMany('App\Transcript');
    }

    public function audioRecording()
    {
        return $this->belongsTo('App\AudioRecording');
    }
}
