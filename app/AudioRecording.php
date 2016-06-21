<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AudioRecording extends Model
{
    use \Eloquence\Behaviours\CamelCasing;


    public function media()
    {
        return $this->hasOne('App\Media', 'id');
    }

    public function session()
    {
        return $this->hasOne('App\Session', 'id');
    }
}
