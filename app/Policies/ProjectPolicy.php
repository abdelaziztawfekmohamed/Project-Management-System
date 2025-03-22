<?php

namespace App\Policies;

use App\Enum\RolesEnum;
use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class ProjectPolicy
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
    public function view(User $user, Project $project): bool
    {
        // Admins can view all projects
        if ($user->hasRole(RolesEnum::Admin->value)) {
            return true;
        }

        // Project Managers can view only their assigned projects
        if ($user->hasRole(RolesEnum::ProjectManager->value)) {
            // dd($project->assigned_project_manager_id === $user->id, $user->id, $project->assigned_project_manager_id);
            return $project->assigned_project_manager_id === $user->id;
        }

        // Team Leaders can view projects where their team is assigned
        if ($user->hasRole(RolesEnum::TeamLeader->value)) {
            return $project->teams->contains('team_leader_id', $user->id);
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Admins and Project Managers can create projects
        return $user->hasRole('admin') || $user->hasRole('project_manager');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project): bool
    {
        // Admins can update any project
        if ($user->hasRole('admin')) {
            return true;
        }

        // Project Managers can update only their assigned projects
        if ($user->hasRole('project_manager')) {
            return $project->assigned_project_manager_id === $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): bool
    {
        // Admins can delete any project
        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return false;
    }
}
