<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(RoleSeeder::class);

        // Crea usuarios de prueba
        User::factory()->count(10)->create(); // Cambia el número según necesites
    }
}
