<?php
namespace App\Http\Controllers;


use App\User;
use Config;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;


class UserController extends Controller
{
    /**
     * Generate JSON Web Token.
     */
    protected function createToken($user)
    {
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, Config::get('app.token_secret'));
    }
    /**
     * Get signed in user's profile.
     */
    public function getUser(Request $request)
    {
        $user = User::find($request['user']['sub']);
        return $user;
    }
    /**
     * Update signed in user's profile.
     */
    public function updateUser(Request $request)
    {
        $user = User::find($request['user']['sub']);
        $user->displayName = $request->input('displayName');
        $user->email = $request->input('email');
        $user->save();
        $token = $this->createToken($user);
        return response()->json(['token' => $token]);
    }

}