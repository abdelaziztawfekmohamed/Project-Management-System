<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\User;

class UserRepository implements UserInterface
{
    public function getAllUsers()
    {
        return User::query();
    }

    public function getAllUsersForTasks()
    {
        return User::query()->orderBy("name", "asc")->get();
    }

    public function getUserTasks($user)
    {
        return $user->tasks();
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

    public function filterByEmail($query, $email)
    {
        return  $query->where("email", "like", "%" . $email . "%");
    }
}
