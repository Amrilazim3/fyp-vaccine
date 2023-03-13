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
        $data = $request->validate($this->ruleValidation());

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
    public function update($id, Request $request)
    {
        $child = Child::find($id);

        $validated = $request->validate($this->ruleValidation());

        $child->update($validated);

        Job::where('meta->child_id', $child->id)->delete();

        ScheduleForVaccination::dispatch($child);

        return redirect()->to(route('dashboard'));
    }

    public function destroy($id)
    {
        $child = Child::find($id);

        Job::where('meta->child_id', $child->id)->delete();

        $child->delete();

        return redirect()->to(route('dashboard'));
    }

    protected function ruleValidation()
    {
        return [
            'name' => 'required|min:10|max:50',
            'birthdate' => 'required|date|after_or_equal:' . date('Y-m-d', strtotime('-15 years')) . '|before_or_equal:' . date('Y-m-d'),
            'gender' => 'required',
            'state' => 'required',
        ];
    }
}
