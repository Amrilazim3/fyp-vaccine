<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function children()
    {
        return $this->belongsToMany(Child::class)
            ->using(ChildVaccine::class)
            ->withPivot('dose_taken');
    }
}
