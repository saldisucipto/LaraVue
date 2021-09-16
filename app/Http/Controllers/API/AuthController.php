<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User; // use model user
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class AuthController extends Controller
{
    // Register Function
    public function register(Request $request)
    {
        $validator =  Validator::make($request->all(), [
                'name' => 'required|min:4',
                'email' => 'required|email|unique:users',
                'age' => 'required',
                'password' => 'required|min:8',
                'country' => 'required',
                'tos' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()->first()], 422);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'age' => $request->age,
                'password' => bcrypt($request->password),
                'country' => $request->country,
                'tos' => $request->tos,
            ]);

            $token = $user->createToken('LaravelAuthApp')->accessToken;
            return response()->json(['token' => $token, 'message' => 'User Berhasil Dibuat'], 200);
        }
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
            return response()->json(['token' => $token, 'message' => 'Login Berhasil!'], 200);
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

    public function users()
    {
        return response()->json("DATA USERS", 200);
    }
}
