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

    public function addChildrenProvider(): array
    {
        return [
            [
                fake()->name('male'),
                Carbon::now()->format('Y-m-d'),
                'male',
                'johor',
                18
            ],
            [
                fake()->name('female'),
                Carbon::now()->format('Y-m-d'),
                'female',
                'johor',
                19
            ],
            [
                fake()->name('female'),
                Carbon::now()->format('Y-m-d'),
                'female',
                'sabah',
                20
            ],
            [
                fake()->name('male'),
                Carbon::now()->subYears(10)->format('Y-m-d'),
                'male',
                'johor',
                1
            ]
        ];
    }

    /**
     * @dataProvider addChildrenProvider
     */
    public function test_add_children($name, $birthdate, $gender, $state, $expectedNotification): void
    {
        Queue::fake();
        Notification::fake();

        $this->seed(VaccineSeeder::class);

        $input = [
            'name' => $name,
            'birthdate' => $birthdate,
            'gender' => $gender,
            'state' => $state
        ];

        $response = $this->actingAs($user = User::factory()->create())
            ->post(route('children.store'), $input);

        $response->assertStatus(302);

        $this->assertDatabaseHas('children', $input);

        Queue::assertPushed(ScheduleForVaccination::class);

        $child = Child::with('parent')->where('name', $name)->first();

        $job = new ScheduleForVaccination($child);
        $job->handle();

        Queue::assertPushed(SendVaccineNotification::class, $expectedNotification);
    }

    public function test_children_can_be_updated()
    {
        //
    }

    public function test_children_can_be_deleted()
    {
        //
    }

    public function test_queue_job()
    {
        $user = User::factory()->create();

        $child = $user->children()->create([
            'parent_id' => $user->id,
            'name' => fake()->name('male'),
            'birthdate' => Carbon::now()->format('Y-m-d'),
            'gender' => 'male',
            'state' => 'johor',
        ]);

        SendVaccineNotification::dispatch(
            $user,
            $child,
            'BCG'
        );

        dd('success');
    } 
}
