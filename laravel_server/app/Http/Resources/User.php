<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class User extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'blocked' => $this->blocked,
            'reason_blocked' => $this->reason_blocked,
            'password' => $this->password,
              
            'reason_reactivated' => $this->reason_reactivated
        ];
    }

    
}
