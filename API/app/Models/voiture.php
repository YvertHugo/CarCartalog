<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class voiture extends Model
{
    protected $fillable = [
        'modele',
        'annee',
        'marque_id',
    ];
    
    public function marque()
    {
        return $this->belongsTo(Marque::class, 'marque_id');
    }
}