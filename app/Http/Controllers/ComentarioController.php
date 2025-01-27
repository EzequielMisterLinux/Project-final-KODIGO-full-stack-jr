<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Support\Facades\Validator;
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
        $validator =Validator::Make($request->all(), [
            'contenido' => 'required|string|max:255', // Valida contenido como string requerido con un máximo de 255 caracteres
            'fecha' => 'required|date', // Valida que sea una fecha válida
            'usuario_id' => 'required|exists:users,id', // Valida que usuario_id exista en la tabla usuarios
            'producto_id' => 'required|exists:products,id', // Valida que producto_id exista en la tabla products
        ]);

         //validando si se rompe las reglas de entrada de datos
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 400);
        }

        // Obtener los datos validados
        $validated = $validator->validated();

        // Crear un nuevo registro en la base de datos
        $comentario = Comentario::create([
            'contenido' => $validated['contenido'],
            'fecha' => $validated['fecha'],
            'usuario_id' => $validated['usuario_id'],
            'producto_id' => $validated['producto_id'],
        ]);
        return response()->json(['message' => 'Successfully registered'], 201);
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
    public function update(Request $request, $id)
    {
        // Buscar el comentario por ID
        $comentario = Comentario::find($id);

        // Verificar si el comentario existe
        if (!$comentario) {
            return response()->json([
                'message' => 'Comentario no encontrado.'
            ], 404);
        }

        // Validar los datos proporcionados
        $validator = Validator::make($request->all(), [
            'contenido' => 'sometimes|string|max:255', // Opcional: si se envía, debe ser string con máx. 255 caracteres
            'fecha' => 'sometimes|date', // Opcional: si se envía, debe ser una fecha válida
            'usuario_id' => 'sometimes|exists:users,id', // Opcional: si se envía, debe existir en la tabla users
            'producto_id' => 'sometimes|exists:products,id', // Opcional: si se envía, debe existir en la tabla products
        ]);

        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 400);
        }

        // Obtener solo los datos validados
        $validated = $validator->validated();

        // Actualizar solo los campos proporcionados
        $comentario->update($validated);

        // Responder con el recurso actualizado
        return response()->json(['message' => 'Correctly updated'], 200);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //
    }
}
