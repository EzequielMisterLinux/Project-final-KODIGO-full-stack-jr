<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         // Validación de los datos
        $validated = $request->validate([
            'contenido' => 'required|string|max:255', // Valida contenido como string requerido con un máximo de 255 caracteres
            'fecha' => 'required|date', // Valida que sea una fecha válida
            'usuario_id' => 'required|exists:users,id', // Valida que usuario_id exista en la tabla usuarios
            'producto_id' => 'required|exists:products,id', // Valida que producto_id exista en la tabla products
        ]);

        // Crear un nuevo registro en la base de datos
        $comentario = Comentario::create([
            'contenido' => $validated['contenido'],
            'fecha' => $validated['fecha'],
            'usuario_id' => $validated['usuario_id'],
            'producto_id' => $validated['producto_id'],
        ]);
        return response()->json($comentario, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //
    }
}
