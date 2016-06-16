<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class SceneTranscript extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'text'
    ];

    public function scene()
    {
        return $this->belongsTo('App\Scene');
    }

    public function session()
    {
        return $this->belongsTo('App\Session');
    }

    public function annotations()
    {
        return $this->hasMany('App\Annotation');
    }

}
