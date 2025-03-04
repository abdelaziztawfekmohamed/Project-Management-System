<?php

namespace App\Repositories;

use App\Interfaces\ProjectInterface;
use App\Models\Project;

class ProjectRepository implements ProjectInterface
{
    public function getAllProjects()
    {
        return Project::query();
    }

    public function getAllProjectsForTasks()
    {
        return Project::query()->orderBy("name", "asc")->get();
    }

    public function getProjectTasks($project)
    {
        return $project->tasks();
    }

    public function getPaginatedResults($query, $sortField, $sortDirection)
    {
        $filteredQuery = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return $filteredQuery;
    }

    public function filterByName($query, $name)
    {
        return  $query->where("name", "like", "%" . $name . "%");
    }

    public function filterByStatus($query, $status)
    {
        return  $query->where("status", $status);
    }
}
