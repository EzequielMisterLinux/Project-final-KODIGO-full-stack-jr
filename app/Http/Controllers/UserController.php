<?php

namespace App\Http\Controllers;

use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Mostrar todos los usuarios
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    // Mostrar un usuario por ID
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user, 200);
    }



    // Actualizar un usuario
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:6',
            'profile_picture' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->only(['name', 'email']);

        // Actualizar contraseña si se proporciona
        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // Actualizar imagen de perfil si se proporciona
        if ($request->hasFile('profile_picture')) {
            $uploadedFileUrl = Cloudinary::upload($request->file('profile_picture')->getRealPath())->getSecurePath();
            $data['profile_picture'] = $uploadedFileUrl;
        }

        $user->update($data);

        return response()->json($user, 200);
    }

    public function updateRole(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $request->validate([
            'role_id' => 'required|integer|in:1,2,3',
        ]);

        $user->update(['role_id' => $request->role_id]);

        return response()->json([
            'message' => 'Role updated successfully',
            'user' => $user
        ], 200);
    }



    // Eliminar un usuario
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }
}
