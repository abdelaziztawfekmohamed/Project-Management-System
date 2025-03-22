<?php

namespace App\Policies;

use App\Enum\RolesEnum;
use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole(RolesEnum::Admin->value) || $user->hasRole(RolesEnum::ProjectManager->value) || $user->hasRole(RolesEnum::TeamLeader->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        // Admins can view all users
        if ($user->hasRole(RolesEnum::Admin->value)) {
            return true;
        }
        // Project Managers can only view users associated with their projects
        if ($user->hasRole(RolesEnum::ProjectManager->value)) {
            // Get all projects managed by this project manager
            $managedProjects = Project::where('project_manager_id', $user->id)->get();

            // Get all teams associated with those projects
            $teams = $managedProjects->flatMap->teams;

            // Get all users associated with those teams
            $users = $teams->flatMap(function ($team) {
                return $team->users;
            })->unique('id');

            // Check if the user being viewed is in the list of users
            return $users->contains($model);
        }

        if ($user->hasRole(RolesEnum::TeamLeader->value)) {
            // Get all teams associated with this user
            $teams = $user->teams;
            // Get all users associated with those teams
            $users = $teams->flatMap(function ($team) {
                return $team->users;
            })->unique('id');
            // Check if the user being viewed is in the list of users
            return $users->contains($model);
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasRole(RolesEnum::Admin->value)) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        if ($user->hasRole(RolesEnum::Admin->value)) {
            return true;
        }
        // Project Managers can only update users associated with their projects
        if ($user->hasRole(RolesEnum::ProjectManager->value)) {
            // Get all projects managed by this project manager
            $managedProjects = Project::where('project_manager_id', $user->id)->get();

            // Get all teams associated with those projects
            $teams = $managedProjects->flatMap->teams;

            // Get all users associated with those teams
            $users = $teams->flatMap(function ($team) {
                return $team->users;
            })->unique('id');

            // Check if the user being updated is in the list of users
            return $users->contains($model);
        }

        if ($user->hasRole(RolesEnum::TeamLeader->value)) {
            // Get all teams associated with this user
            $teams = $user->teams;
            // Get all users associated with those teams
            $users = $teams->flatMap(function ($team) {
                return $team->users;
            })->unique('id');
            // Check if the user being updated is in the list of users
            return $users->contains($model);
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        // Admins can delete all users except themselves and other admins
        if ($user->hasRole(RolesEnum::Admin->value)) {
            if ($model->hasRole(RolesEnum::Admin->value)) {
                return false;
            }
            return true;
        }
        // Project Managers can only delete users associated with their projects
        if ($user->hasRole(RolesEnum::ProjectManager->value)) {
            // Get all projects managed by this project manager
            $managedProjects = Project::where('project_manager_id', $user->id)->get();

            // Get all teams associated with those projects
            $teams = $managedProjects->flatMap->teams;

            // Get all users associated with those teams
            $users = $teams->flatMap(function ($team) {
                return $team->users;
            })->unique('id');

            // Check if the user being deleted is in the list of users
            return $users->contains($model);
        }

        if ($user->hasRole(RolesEnum::TeamLeader->value)) {
            // Get all teams associated with this user
            $teams = $user->teams;
            // Get all users associated with those teams
            $users = $teams->flatMap(function ($team) {
                return $team->users;
            })->unique('id');
            // Check if the user being deleted is in the list of users
            return $users->contains($model);
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }
}
