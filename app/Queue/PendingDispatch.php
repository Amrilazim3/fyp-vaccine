<?php

namespace App\Queue;

use App\Models\Job;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Foundation\Bus\PendingDispatch as PendingDispatchBase;

class PendingDispatch extends PendingDispatchBase
{
    public function __destruct()
    {
        $recordId = null;
        if (!$this->shouldDispatch()) {
            return;
        } elseif ($this->afterResponse) {
            $recordId = app(Dispatcher::class)->dispatchAfterResponse($this->job);
        } else {
            $recordId = app(Dispatcher::class)->dispatch($this->job);
        }

        if ($recordId) {
            Job::find($recordId)->update([
                'meta' => $this->job->meta(),
            ]);
        }
    }
}
