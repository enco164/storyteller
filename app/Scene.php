<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Scene extends Model
{
    use \Eloquence\Behaviours\CamelCasing;

    protected $fillable = [
        'pictureBookId', 'sceneUrl', 'sceneNumber', 'title', 'mediaId'
    ];

    public function pictureBook()
    {
        return $this->belongsTo('App\PictureBook');
    }

    public function media()
    {
        return $this->belongsTo('App\Media');
    }

    public function sceneTranscripts()
    {
        return $this->hasMany('App\SceneTranscript');
    }
}
