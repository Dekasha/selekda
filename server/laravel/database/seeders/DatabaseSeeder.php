<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin@gmail.com',
            'role' => 'admin',
            'username' => 'admin',
            'date_of_birth' => '2000-01-01',
            'phone_number' => '08123456789',
        ]);

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => 'user@gmail.com',
            'role' => 'user',
            'username' => 'user',
            'date_of_birth' => '2000-01-01',
            'phone_number' => '08123456789',
        ]);
    }
}
