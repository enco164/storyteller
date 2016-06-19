<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class PictureBook extends Model
{
    use \Eloquence\Behaviours\CamelCasing;
    
    protected $fillable = [
        "title", "authors", "publisher", "yearOfPublishing"
    ];

    public function sessions()
    {
        return $this->hasMany('App\Session');
    }

    public function scenes()
    {
        return $this->hasMany('App\Scene');
    }
}
