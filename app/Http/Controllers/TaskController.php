<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Services\ProjectService;
use App\Services\TaskService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    protected $taskService;
    protected $projectService;
    protected $userService;

    public function __construct(TaskService $taskService, ProjectService $projectService, UserService $userService)
    {
        $this->taskService = $taskService;
        $this->projectService = $projectService;
        $this->userService = $userService;
    }

    private function extractQueryParams(Request $request): array
    {
        $filters = [
            'name' => $request->input('name') ?: null,
            'status' => $request->input('status') ?: null,
        ];

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'asc');

        return [$filters, $sortField, $sortDirection];
    }

    public function index(Request $request)
    {
        [$filters, $sortField, $sortDirection] = $this->extractQueryParams($request);

        $tasks = $this->taskService->getTasks($filters, $sortField, $sortDirection);

        return Inertia::render("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        $projects = $this->projectService->getAllProjectsForTasks();
        $users = $this->userService->getAllUsersForTasks();

        return Inertia::render("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $validatedData = $request->validated();

        $this->taskService->createTask($validatedData);

        return to_route('task.index')
            ->with('success', 'Task created successfully.');
    }

    public function show(Task $task)
    {
        // dd($task);
        return Inertia::render("Task/Show", [
            "task" => new TaskResource($task),
        ]);
    }

    public function edit(Task $task)
    {
        $projects = $this->projectService->getAllProjectsForTasks();
        $users = $this->userService->getAllUsersForTasks();

        return Inertia::render("Task/Edit", [
            "task" => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validatedData = $request->validated();
        $this->taskService->updateTask($validatedData, $task);

        return to_route('task.index')
            ->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return to_route('task.index')
            ->with('success', 'Task deleted successfully.');
    }

    public function myTasks(Request $request)
    {
        [$filters, $sortField, $sortDirection] = $this->extractQueryParams($request);

        $user = $this->userService->getTheAuthUser(Auth::user());
        $userID = $user->id;

        $tasks = $this->taskService->getAuthUserTasks($userID, $filters, $sortField, $sortDirection);

        return Inertia::render("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
