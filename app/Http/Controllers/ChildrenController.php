<?php

namespace App\Http\Controllers;

use App\Jobs\ScheduleForVaccination;
use App\Models\Child;
use Illuminate\Http\Request;

class ChildrenController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:10|max:50',
            'birthdate' => 'required|date|after_or_equal:' . date('Y-m-d', strtotime('-15 years')),
            'gender' => 'required',
            'state' => 'required',
        ]);

        $child = $request->user()->children()->create($data);

        $child->setRelation('parent', $request->user());

        ScheduleForVaccination::dispatch($child);

        return redirect()->to(route('dashboard'));
    }
}
