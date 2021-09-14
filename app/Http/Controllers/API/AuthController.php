<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User; // use model user
use Illuminate\Http\Request;
use Auth;

class AuthController extends Controller
{
    // Register Function
    public function register(Request $request)
    {
        // return response()->json("Register Function", 200); ..debug
        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'age' => 'required',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'age' => $request->age,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('LaravelAuthApp')->accessToken;

        return response()->json(['token' => $token, 'message' => 'User Berhasil Dibuat'], 200);
    }
    // Login Function
    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (auth()->attempt($loginData)) {
            $token = auth()->user()->createToken('LaravelAuthApp')->accessToken;
            return response()->json(['token' => $token, 'message' => 'Akses Berhasil'], 200);
        } else {
            return response()->json(['error' => 'Akses Tidak Dizinkan'], 401);
        }
    }

    // Destroy / Logout Function
    public function logout(Request $request)
    {
        Auth::user()->token()->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json('Succesfully Logout');
    }
}
