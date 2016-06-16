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

    public function kids()
    {
        return $this->belongsToMany('App\Kid','kids_residences','kid_id','residence_id');
    }
}
