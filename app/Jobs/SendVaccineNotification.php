<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Child;
use Illuminate\Bus\Queueable;
use App\Queue\PendingDispatch;
use Illuminate\Queue\SerializesModels;
use App\Notifications\VaccinationNotice;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Notification;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class SendVaccineNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $child;
    public $vaccineName;

    public function __construct(User $user, Child $child, $vaccineName)
    {
        $this->user = $user;
        $this->child = $child;
        $this->vaccineName = $vaccineName;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Notification::send($this->user, new VaccinationNotice($this->child, $this->vaccineName));
    }

    public static function dispatch(...$arguments)
    {
        return new PendingDispatch(new static(...$arguments));
    }

    public function meta()
    {
        return [
            'child_id' => $this->child->id,
        ];
    }
}
