import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Post, Comment, User } from "@/types";
import PostUpvoteDownvote from "@/Components/PostUpvoteDownvote";
import NewCommentForm from "@/Components/NewCommentForm";
import CommentItem from "@/Components/CommentItem";

export default function Show({
  post,
  comments,
  user,
}: {
  post: Post;
  comments: Comment[];
  user: User;
}) {
  // console.log(comments.forEach((comment) => console.log(comment.user)));
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Post <b>{post.name}</b>
        </h2>
      }
    >
      <Head title={"Post " + post.name} />

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
          <PostUpvoteDownvote post={post} />
          <div className="flex-1">
            <h2 className="text-2xl mb-2">{post.name}</h2>
            <p>{post.description}</p>
            {comments && (
              <div className="mt-8">
                <NewCommentForm user={user} postItem={post} />
                {comments.map((comment) => (
                  <CommentItem comment={comment} key={comment.id} user={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
