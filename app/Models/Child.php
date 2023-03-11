<?php

namespace App\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Child extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'birthdate' => 'datetime:Y-m-d'
    ];

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

    protected function ageInMonths(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->birthdate->diffInMonths(now())
        );
    }

    public function getMonthsLeftForVac(VaccineRequirement $vr)
    {
        return intval($vr->value) - $this->ageInMonths;
    }
}
