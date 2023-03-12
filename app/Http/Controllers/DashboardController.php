<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $children = $request->user()->children()->get();

        $children->each(function ($child) {
            $child->append(['percentage_completed', 'next_vaccination_info']);
        });

        return Inertia::render('Dashboard', [
            'children' => $children
        ]);
    }
}
