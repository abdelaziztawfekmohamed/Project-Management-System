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
            'due_date' => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d H:i:s'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'assigned_user_id' => fake()->randomElement([1, 2]),
            'created_by' => fake()->randomElement([1, 2]),
            'updated_by' => fake()->randomElement([1, 2]),
        ];
    }
}
