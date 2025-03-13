<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageUsers = 'manage_users';
    case ManagePosts = 'manage_posts';
    case ManageComments = 'manage_comments';
    case ManageProjects = 'manage_projects';
    case ManageTasks = 'manage_tasks';
    case UpvoteDownvote = 'upvote_downvote';
}
