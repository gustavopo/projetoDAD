<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','face', 'active', 'path'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
}
