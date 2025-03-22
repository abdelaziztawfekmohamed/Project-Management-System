<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(6),
            'description' => fake()->realText(),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'assigned_user_id' => fake()->numberBetween(25, 125),
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(3, 8),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
