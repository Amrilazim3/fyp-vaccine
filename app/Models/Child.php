<?php

namespace App\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Child extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'birthdate' => 'datetime:Y-m-d'
    ];

    protected $appends = [
        'age_in_months',
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

    protected function percentageCompleted(): Attribute
    {
        return Attribute::make(
            get: function () {
                $allowedVaccines = $this->getAllowedVaccines();

                $percent = ($this->vaccines->count() / count($allowedVaccines)) * 1;

                return number_format($percent, 2) . "%";
            }
        );
    }

    public function nextVaccinationInfo(): Attribute
    {
        return Attribute::make(
            get: function () {
                $allowedVaccines = $this->getAllowedVaccines();

                $takenVaccines = $this->vaccines->toArray();

                foreach ($takenVaccines as $takenVaccine) {
                    $namedVaccines = array_filter($allowedVaccines, function ($vaccine) use ($takenVaccine) {
                        return $vaccine['name'] == $takenVaccine['name'];
                    });
                    
                    $temp = $takenVaccine['pivot']['dose_taken'];

                    foreach ($namedVaccines as $namedVacKey => $namedVacValue) {
                        while ($temp !== 0) {
                            unset($allowedVaccines[$namedVacKey]);
                            $temp--;
                        }
                    }
                }

                foreach ($allowedVaccines as $vaccine) {
                    if ($this->age_in_months >= intval($vaccine['month'])) {
                        return [
                            'name' => $vaccine['name'],
                            'date' => Carbon::now()
                                ->addMonths($this->age_in_months)
                                ->addDays(3)
                                ->format('Y-m-d')
                        ];
                    }
                }
            }
        );
    }

    public function getMonthsLeftForVac(VaccineRequirement $vr)
    {
        return intval($vr->value) - $this->ageInMonths;
    }

    public function getAllowedVaccines(): array
    {
        $vaccinesReqs = VaccineRequirement::getVaccinesRequirements();

        $allowedVaccines = [];

        foreach ($vaccinesReqs as $vacReq) {
            if (count($additionalReqs = $vacReq['addtional_reqs']) > 0) {
                if (!$this->isPassRequirements($additionalReqs)) {
                    continue;
                }
            }

            if ($this->getMonthsLeftForVac($vacReq['model']) >= 0) {
                $allowedVaccines[] = $vacReq;
            }
        }

        return $allowedVaccines;
    }

    protected function isPassRequirements(array $additionalReq): bool
    {
        foreach ($additionalReq as $req) {
            if ($this->{$req['type']} != $req['value']) {
                return false;
            }
        }

        return true;
    }
}
