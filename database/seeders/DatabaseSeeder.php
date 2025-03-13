<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $teamMemberRole = Role::create(['name' => RolesEnum::TeamMember->value]);
        $projectManagerRole = Role::create(['name' => RolesEnum::ProjectManager->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $managePostsPermission = Permission::create([
            'name' => PermissionsEnum::ManagePosts->value,
        ]);

        $manageProjectsPermission = Permission::create([
            'name' => PermissionsEnum::ManageProjects->value,
        ]);

        $manageTasksPermission = Permission::create([
            'name' => PermissionsEnum::ManageTasks->value,
        ]);

        $manageCommentsPermission = Permission::create([
            'name' => PermissionsEnum::ManageComments->value,
        ]);

        $manageUsersPermission = Permission::create([
            'name' => PermissionsEnum::ManageUsers->value,
        ]);

        $UpvoteDownvotePermission = Permission::create([
            'name' => PermissionsEnum::UpvoteDownvote->value,
        ]);

        $teamMemberRole->syncPermissions([$UpvoteDownvotePermission]);

        $projectManagerRole->syncPermissions([$UpvoteDownvotePermission, $manageCommentsPermission]);

        $adminRole->syncPermissions([
            $UpvoteDownvotePermission,
            $manageCommentsPermission,
            $manageUsersPermission
        ]);

        User::factory()->create([
            'name' => 'Abdulaziz',
            'email' => 'abdulaziz@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => now(),
        ])->assignRole(RolesEnum::Admin);

        User::factory()->create([
            'id' => 2,
            'name' => 'Ahmed Sayed',
            'email' => 'ahmed@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => now()
        ])->assignRole(RolesEnum::ProjectManager);

        User::factory()->create([
            'id' => 3,
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => now()
        ])->assignRole(RolesEnum::TeamMember);

        // Project::factory()->count(30)->hasTasks(30)->create();

        Project::factory(30)->create()->each(function ($project) {
            $project->tasks()->createMany(
                Task::factory(30)->make()->toArray()
            );
        });
    }
}
