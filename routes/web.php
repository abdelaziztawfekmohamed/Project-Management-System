<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified', sprintf(
    'role:%s|%s|%s',
    RolesEnum::ProjectManager->value,
    RolesEnum::TeamLeader->value,
    RolesEnum::Admin->value,
    RolesEnum::TeamMember->value
)])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::resource('user', UserController::class);
    Route::middleware('role:' . RolesEnum::Admin->value)->group(function () {
        Route::get('/user', [UserController::class, 'index'])
            ->name('user.index');
        Route::get('/user/{user}/edit', [UserController::class, 'edit'])
            ->name('user.edit');
        Route::put('/user/{user}', [UserController::class, 'update'])
            ->name('user.update');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('project', ProjectController::class);
    Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])
        ->name('task.myTasks');
    Route::resource('task', TaskController::class);
    Route::resource('post', PostController::class)
        ->except(['index', 'show'])
        ->middleware('can:' . PermissionsEnum::ManagePosts->value);

    Route::get('/post', [PostController::class, 'index'])
        ->name('post.index');

    Route::get('/post/{post}', [PostController::class, 'show'])
        ->name('post.show');

    Route::post('/post/{post}/upvote', [UpvoteController::class, 'store'])
        ->name('upvote.store');
    Route::delete('/upvote/{post}', [UpvoteController::class, 'destroy'])
        ->name('upvote.destroy');

    Route::post('/post/{post}/comments', [CommentController::class, 'store'])
        ->name('comment.store')
        ->middleware('can:' . PermissionsEnum::ManageComments->value);
    Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
        ->name('comment.destroy')
        ->middleware('can:' . PermissionsEnum::ManageComments->value);
});




require __DIR__ . '/auth.php';
