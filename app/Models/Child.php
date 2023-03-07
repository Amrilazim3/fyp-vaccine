<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id', 'id');
    }

    public function vaccines()
    {
        return $this->belongsToMany(Vaccine::class)
            ->using(ChildVaccine::class)
            ->withPivot('dose_taken');
    }
}
