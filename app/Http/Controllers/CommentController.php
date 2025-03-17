<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $data = $request->validate([
            'comment' => 'required'
        ]);

        $data['post_id'] = $post->id;
        $data['created_by'] = Auth::id();
        Comment::create($data);

        return to_route('post.show', $post);
    }

    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }
        $postId = $comment->post_id;
        $comment->delete();

        return to_route('post.show', $postId);
    }
}


