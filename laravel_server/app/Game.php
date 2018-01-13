<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'created_by',
        'status',
        'winnerName',
        'total_players',
        'type'    ];

    public function getWinnerName()
    {
       // return $this->winner;
        //return "Unknown Winner";
        return $this->hasOne('App\User');
    }
}
