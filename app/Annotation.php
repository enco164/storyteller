<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Annotation extends Model
{
    protected $fillable = [
        'name',
        'comment',
        'startIndex',
        'endIndex'
    ];
}
