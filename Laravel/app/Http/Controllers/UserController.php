<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all(); 
        return response()->json(['users' => $users]);
    }
    public function destroy($id)
{
   
    $user = User::find($id);


    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    $user->delete();

    return response()->json(['message' => 'Usuario eliminado con éxito']);
}
}
