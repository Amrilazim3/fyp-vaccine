<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Child;
use App\Models\Vaccine;
use Illuminate\Bus\Queueable;
use App\Models\VaccineRequirement;
use Illuminate\Support\Facades\Cache;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ScheduleForVaccination implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $child;

    public function __construct(Child $child)
    {
        $this->child = $child;
    }

    public function handle(): void
    {
        $vaccinesReqs = $this->getVaccinesRequirements();

        foreach ($vaccinesReqs as $vacReq) {
            if (count($additionalReqs = $vacReq['addtional_reqs']) > 0) {
                if (!$this->isPassRequirements($additionalReqs)) {
                    continue;
                }
            }

            if (($monthsLeft = $this->child->getMonthsLeftForVac($vacReq['model'])) >= 0) {
                SendVaccineNotification::dispatch(
                    $this->child->parent,
                    $this->child,
                    $vacReq['name']
                )
                    ->delay(now()->addMonths(
                        $monthsLeft
                    )->addDays(3));
            }
        }
    }

    protected function getVaccinesRequirements()
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

    protected function isPassRequirements(array $additionalReq): bool
    {
        foreach ($additionalReq as $req) {
            if ($this->child->{$req['type']} != $req['value']) {
                return false;
            }
        }

        return true;
    }
}
