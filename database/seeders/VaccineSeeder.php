<?php

namespace Database\Seeders;

use App\Models\Vaccine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VaccineSeeder extends Seeder
{
    public function run(): void
    {
        $vaccines = [
            ["BCG", "desc", 2],
            ["Hepatits B", "desc", 3],
            ["DPT+Hib", "desc", 3],
            ["DPT/DT", "desc", 2],
            ["OPV", "desc", 5],
            ["Measles", "desc", 1],
            ["MMR", "desc", 2],
            ["Tetanus", "desc", 1],
            ["Rubella", "desc", 1],
        ];

        foreach ($vaccines as $vaccine) {
            Vaccine::create([
                'name' => $vaccine[0],
                'description' => $vaccine[1],
                'max_to_taken' => $vaccine[2]
            ]);
        }
    }
}
