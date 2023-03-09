<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $_reqs = [];

    public function children()
    {
        return $this->belongsToMany(Child::class)
            ->using(ChildVaccine::class)
            ->withPivot('dose_taken');
    }

    public function requirementsByMonth()
    {
        return $this->hasMany(VaccineRequirement::class, 'vaccine_id')
            ->where('type', 'month')
            ->orderBy('value');
    }

    public function requirementsNotByMonth()
    {
        return $this->hasMany(VaccineRequirement::class, 'vaccine_id')
            ->where('type', '!=', 'month');
    }
}
