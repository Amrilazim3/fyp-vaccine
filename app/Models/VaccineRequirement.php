<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class VaccineRequirement extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class);
    }

    public function parent()
    {
        return $this->belongsTo(static::class);
    }

    public function childrenNotMonth()
    {
        return $this->hasMany(static::class, 'parent_id')->where('type', '!=', 'month');
    }

    public function scopeMonth($query)
    {
        return $query->where('type', 'month');
    }

    public function getVaccinesRequirements()
    {
        return Cache::rememberForever('vaccines-requirements', function () {
            $vaccines = Vaccine::all();
            $requirements = VaccineRequirement::with(['childrenNotMonth', 'parent'])
                ->month()
                ->orderBy('value', 'asc')
                ->get();

            $flatten = [];
            $requirements->sortBy('value')->each(function ($req) use ($vaccines, &$flatten) {
                $vaccine = $vaccines->firstWhere('id', $req->vaccine_id);

                $flatten[] = [
                    'name' => $vaccine->name,
                    'model' => $req,
                    'month' => $req->value,
                    'depend_on' => !$req->parent ? null : $req->parent->toArray(),
                    'addtional_reqs' => $req->childrenNotMonth->toArray()
                ];
            });

            return $flatten;
        });
    }
}
