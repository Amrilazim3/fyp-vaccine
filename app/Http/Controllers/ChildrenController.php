<?php

namespace App\Http\Controllers;

use App\Jobs\ScheduleForVaccination;
use App\Models\Child;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function show($id, Request $request)
    {
        $child = Child::find($id);

        return Inertia::render('Child', [
            'name' => $child->name
        ]);
    }

    // update
    public function update(Request $request, Child $child)
    {
        // validate

        // update

        // delete all jobs
        Job::where('meta->child_id', $child->id)->delete();

        // dispatch
        ScheduleForVaccination::dispatch($child);

        return redirect()->to(route('dashboard'));
    }
}
