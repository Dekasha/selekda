<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|confirmed|string|min:8|max:255',
                'date_of_birth' => 'required|date|before:today',
                'phone_number' => 'required|string|max:255|unique:users',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'date_of_birth' => $request->date_of_birth,
                'phone_number' => $request->phone_number,
                'profile_picture' => $request->file('profile_picture') ? $request->file('profile_picture')->store('profile-pictures', 'public') : null,
            ]);

            return response()->json('Register Success', 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            $token = $user->createToken('selekdaToken')->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token
            ];

            return response($response, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        } catch (\Illuminate\Auth\AuthenticationException $e) {
            return response()->json(['email' => ['The provided credentials are incorrect.']], 401);
        }
    }


    public function profile()
    {
        return response()->json(Auth::user());
    }


    public function updateProfile(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . Auth::user()->id,
                'password' => 'nullable|confirmed|min:8|max:255',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'date_of_birth' => 'required|date_format:Y-m-d',
                'phone_number' => 'nullable|numeric|digits_between:10,15'
            ]);

            $user = User::find(Auth::user()->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->date_of_birth = $request->date_of_birth;
            $user->phone_number = $request->phone_number;

            if ($request->password) {
                $user->password = Hash::make($request->password);
            }

            if ($request->file('profile_picture')) {
                Storage::delete($user->profile_picture);
                $user->profile_picture = $request->file('profile_picture')->store('profile-pictures', 'public');
            }

            $user->save();

            return response()->json("Update Profile Success", 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        } catch (\Exception $e) {
            return response()->json("Update Profile Gagal", 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json("Logout Success", 200);
        } catch (\Exception $e) {
            return response()->json("Gagal Logout", 500);
        }
    }
}
