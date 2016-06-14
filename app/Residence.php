<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Residence extends Model
{
    protected $table = 'residences';

    protected $fillable =[
        'state',
        'city'
    ];
}
