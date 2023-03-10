<?php

namespace App\Jobs;

use App\Models\Child;
use App\Models\User;
use App\Notifications\VaccinationNotice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

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
}
