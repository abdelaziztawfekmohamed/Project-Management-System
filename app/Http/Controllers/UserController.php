<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    private function extractQueryParams(Request $request): array
    {
        $filters = [
            'name' => $request->input('name') ?: null,
            'email' => $request->input('email') ?: null,
        ];

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'asc');

        return [$filters, $sortField, $sortDirection];
    }

    public function index(Request $request)
    {
        [$filters, $sortField, $sortDirection] = $this->extractQueryParams($request);

        $users = $this->userService->getUsers($filters, $sortField, $sortDirection);

        return Inertia::render("User/Index", [
            "users" => UserResource::collection($users),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render("User/Create");
    }

    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();

        $this->userService->createUser($validatedData);

        return to_route('user.index')
            ->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render("User/Edit", [
            "user" => new UserResource($user),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validatedData = $request->validated();
        $this->userService->updateUser($validatedData, $user);

        return to_route('user.index')
            ->with('success', 'User ' . $user->name . ' updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return to_route('user.index')
            ->with('success', 'User deleted successfully.');
    }
}
