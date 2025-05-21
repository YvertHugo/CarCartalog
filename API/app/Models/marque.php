<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class marque extends Model
{
    protected $fillable = [
        'nom',
    ];

    public function voiture()
    {
        return $this->hasMany(Voiture::class);
    }
}
