<?php

namespace App\Exceptions;

use Exception;

class EmailTakenException extends Exception
{
    public function render()
    {
        return response()->view('oauth.emailTaken', [], 400);
    }
}
