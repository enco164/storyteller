<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AudioRecording extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
       'recordingDate', 'mediaId'
    ];

    public function media()
    {
        return $this->belongsTo('App\Media');
    }

    public function session()
    {
        return $this->hasOne('App\Session');
    }
}
