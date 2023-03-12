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
        $allowedVaccines = $this->child->getAllowedVaccines();

        foreach ($allowedVaccines as $vacReq) {
            $monthsLeft = $this->child->getMonthsLeftForVac($vacReq['model']);

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
