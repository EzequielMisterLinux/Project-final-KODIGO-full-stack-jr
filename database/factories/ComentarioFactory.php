<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ComentarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contenido' => $this->faker->paragraph(), // Texto ficticio para el comentario
            'fecha' => $this->faker->dateTimeBetween('-1 year', 'now'), // Fecha aleatoria entre hace un año y ahora
            'usuario_id' => User::query()->inRandomOrder()->value('id'), // Selecciona un ID de usuario existente
            'producto_id' => Product::query()->inRandomOrder()->value('id'), // Selecciona un ID de producto existente
        ];
    }
}
