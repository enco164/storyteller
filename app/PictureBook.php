<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PictureBook extends Model
{
    protected $table = 'pictureBooks';

    protected $fillable = [
        'title',
        'authors',
        'publisher',
        'yearOfPublishing'
    ];
}
