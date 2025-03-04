<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
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

        $projects = $this->projectService->getProjects($filters, $sortField, $sortDirection);

        return Inertia::render("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render("Project/Create");
    }

    public function store(StoreProjectRequest $request)
    {
        $validatedData = $request->validated();

        $this->projectService->createProject($validatedData);

        return to_route('project.index')
            ->with('success', 'Project created successfully.');
    }

    public function show(Project $project, Request $request)
    {
        [$filters, $sortField, $sortDirection] = $this->extractQueryParams($request);

        $tasks = $this->projectService->getProjectTasks($project, $filters, $sortField, $sortDirection);

        return Inertia::render("Project/Show", [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render("Project/Edit", [
            "project" => new ProjectResource($project),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validatedData = $request->validated();
        $this->projectService->updateProject($validatedData, $project);

        return to_route('project.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return to_route('project.index')
            ->with('success', 'Project deleted successfully.');
    }
}
