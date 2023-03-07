<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
