<?php

namespace Tests\Feature;

use App\Jobs\ScheduleForVaccination;
use App\Jobs\SendVaccineNotification;
use App\Models\Child;
use App\Models\User;
use App\Models\Vaccine;
use App\Notifications\VaccinationNotice;
use Carbon\Carbon;
use Database\Seeders\VaccineSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ChildrenTest extends TestCase
{
    use RefreshDatabase;

    public function test_add_children(): void
    {
        Queue::fake();
        Notification::fake();

        $this->seed(VaccineSeeder::class);

        $input = [
            'name' => fake()->name('male'),
            'birthdate' => Carbon::now()->format('Y-m-d'),
            'gender' => 'male',
            'state' => 'johor'
        ];
        
        $response = $this->actingAs($user = User::factory()->create())
            ->post(route('children.store'), $input);

        $response->assertStatus(302);

        $this->assertDatabaseHas('children', $input);

        Queue::assertPushed(ScheduleForVaccination::class);
        
        $child = Child::with('parent')->where('name', $input['name'])->first();

        $job = new ScheduleForVaccination($child);
        $job->handle();

        Queue::assertPushed(SendVaccineNotification::class, 18);

        $job2 = new SendVaccineNotification($user, $child, Vaccine::first());
        $job2->handle();

        Notification::assertSentTo($user, VaccinationNotice::class);
    }
}
