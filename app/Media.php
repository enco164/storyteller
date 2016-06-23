<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'fileName',
        'path'
    ];

    public function recording()
    {
        return $this->hasOne('App\AudioRecording');
    }

    public function scene()
    {
        return $this->hasOne('App\Scene');
    }

    //
}
