<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AuthController extends Controller
{

    
    public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|min:6',
        'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);
    
    $profilePictureUrl = null;
    
    // Subir la foto de perfil a Cloudinary si está presente
    if ($request->hasFile('profile_picture')) {
        $uploadedFileUrl = Cloudinary::upload($request->file('profile_picture')->getRealPath())->getSecurePath();
        $profilePictureUrl = $uploadedFileUrl;
    }

    // Crear al usuario en la base de datos
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role_id' => 3, // Default to 'user'
        'profile_picture' => $profilePictureUrl,
    ]);

    // Crear el token JWT para el nuevo usuario
    $token = JWTAuth::fromUser($user);
    
    return response()->json([
        'token' => $token,
        'user' => $user
    ])->cookie(
        'token', 
        $token, 
        config('jwt.ttl'), 
        '/', 
        null, 
        false, 
        true // HttpOnly
    );
}


    
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    
        return response()->json([
            'token' => $token,
            'user' => Auth::user()
        ])->cookie(
            'token', 
            $token, 
            config('jwt.ttl'), 
            '/', 
            null, 
            false, 
            true // HttpOnly
        );
    }


    public function me()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        try {
            // Invalida el token JWT actual
            JWTAuth::invalidate(JWTAuth::getToken());
    
            // Elimina la cookie del token
            return response()->json(['message' => 'Logged out successfully'])->cookie(
                'token', 
                null, 
                -1, // Configura la cookie para que expire inmediatamente
                '/', 
                null, 
                false, 
                true // HttpOnly
            );
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to log out'], 500);
        }
    }
    
}
