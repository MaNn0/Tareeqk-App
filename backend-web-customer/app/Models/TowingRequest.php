<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TowingRequest extends Model
{
    protected $fillable = [
        'customer_name',
        'phone',
        'location',
        'note',
        'status',
        'user_id',
        'driver_id'
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}
