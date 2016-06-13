<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Scene extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'sceneUrl', 'sceneNumber', 'title'
    ];

    public function pictureBook()
    {
        return $this->belongsTo('App\PictureBook');
    }

    public function sceneTranscript()
    {
        return $this->hasOne('App\SceneTranscript', 'sceneTranscript_id');
    }
}
