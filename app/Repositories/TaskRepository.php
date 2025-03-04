<?php

namespace App\Repositories;

use App\Models\Task;
use App\Interfaces\TaskInterface;

class TaskRepository implements TaskInterface
{

    public function getAllTasks()
    {
        return Task::query();
    }

    public function getAuthUserTasks($userID)
    {
        return Task::query()->where('assigned_user_id', $userID);
    }

    public function totalPendingTasks()
    {
        $tasks = $this->getAllTasks();
        return $tasks->where('status', 'pending')->count();
    }

    public function myPendingTasks($userID)
    {
        $tasks = $this->getAllTasks();
        return $tasks->where('status', 'pending')
            ->where('assigned_user_id', $userID)
            ->count();
    }

    public function totalProgressTasks()
    {
        $tasks = $this->getAllTasks();
        return $tasks->where('status', 'in_progress')->count();
    }

    public function myProgressTasks($userID)
    {
        $tasks = $this->getAllTasks();
        return $tasks->where('status', 'in_progress')
            ->where('assigned_user_id', $userID)
            ->count();
    }

    public function totalCompletedTasks()
    {
        $tasks = $this->getAllTasks();
        return $tasks->where('status', 'completed')->count();
    }

    public function myCompletedTasks($userID)
    {
        $tasks = $this->getAllTasks();
        return $tasks->where('status', 'completed')
            ->where('assigned_user_id', $userID)
            ->count();
    }

    public function activeTasks($userID)
    {
        $tasks = $this->getAllTasks();
        return $tasks->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $userID)
            ->limit(10)
            ->get();
    }

    public function getPaginatedResults($query, $sortField, $sortDirection)
    {

        $filteredQuery = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        return $filteredQuery;
    }

    public function getAuthUserPaginatedResults($query, $sortField, $sortDirection)
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
