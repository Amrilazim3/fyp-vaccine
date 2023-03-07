<?php

namespace Database\Seeders;

use App\Models\Vaccine;
use App\Models\VaccineRequirement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VaccineSeeder extends Seeder
{
    public function run(): void
    {
        $vaccines = [
            ["BCG", "desc", 2, [
                ['month', 0],
                ['month', 84],
            ]],
            ["Hepatits B", "desc", 3, [
                ['month', 0],
                ['month', 1],
                ['month', 5],
            ]],
            ["DPT+Hib", "desc", 3, [
                ['month', 2],
                ['month', 3],
                ['month', 5],
            ]],
            ["DPT/DT", "desc", 2, [
                ['month', 18],
                ['month', 84],
            ]],
            ["OPV", "desc", 5, [
                ['month', 2],
                ['month', 3],
                ['month', 5],
                ['month', 18],
                ['month', 84],
            ]],
            ["Measles", "desc", 1, [
                ['month', 6],
                ['state', 'sabah'],
            ]],
            ["MMR", "desc", 2, [
                ['month', 12],
                ['month', 84],
            ]],
            ["Tetanus", "desc", 1, [
                ['month', 180],
            ]],
            ["Rubella", "desc", 1, [
                ['month', 144],
                ['gender', 'female'],
            ]],
        ];

        foreach ($vaccines as $vaccine) {
            $newVaccine = Vaccine::create([
                'name' => $vaccine[0],
                'description' => $vaccine[1],
                'max_to_taken' => $vaccine[2]
            ]);

            foreach ($vaccine[3] as $key => $requirement) {
                VaccineRequirement::create([
                    'vaccine_id' => $newVaccine->id,
                    'parent_id' => $key == 0 ?
                        null :
                        VaccineRequirement::orderBy('id', 'desc')->first()->id,
                    'type' => $requirement[0],
                    'value' => $requirement[1]
                ]);
            }
        }
    }
}
