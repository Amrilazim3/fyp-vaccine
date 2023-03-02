<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\EmailTakenException;
use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OAuthServiceController extends Controller
{
    public function redirect($service)
    {
        $service = Socialite::driver($service)->stateless()->redirect()->getTargetUrl();
        
        return redirect()->back()->with('url', $service);
    }

    public function handleCallback($service)
    {
        $user = Socialite::driver($service)->stateless()->user();
        
        // google api bug
        dd($user);

        // insert additional column to user table
        $user = $this->findOrCreateUser($service, $user);

        return view('oauth/callback', [
            'id' => $user->id,
        ]);
    }

    protected function findOrCreateUser($service, $user)
    {
        $oauthService = User::where('service', $service)
            ->where('service_id',  $user->getId())
            ->first();

        if ($oauthService) {
            return $oauthService;
        }

        if (User::where('email', $user->getEmail())->exists()) {
            throw new EmailTakenException(); 
        }

        return $this->createUser($service, $user);
    }

    protected function createUser($service, $sUser)
    {
        $user = User::create([
            'name' => $sUser->getName() ? $sUser->getName() : $sUser->getNickname(),
            'email' => $sUser->getEmail(),
            'email_verified_at' => $sUser->user['email_verified'] ? Carbon::now()->toDateTime() : null,
            'password' => null,
            'service' => $service,
            'service_id' => $sUser->getId(),
        ]);

        return $user;
    }

    public function login(Request $request)
    {
        Auth::loginUsingId($request->id);

        return redirect()->route('products.index');
    }
}
