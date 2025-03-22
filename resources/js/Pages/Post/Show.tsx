import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Post, Comment, User } from "@/types";
import PostUpvoteDownvote from "@/Components/PostUpvoteDownvote";
import NewCommentForm from "@/Components/NewCommentForm";
import CommentItem from "@/Components/CommentItem";

export default function Show({ post, user }: { post: Post; user: User }) {
  // console.log(comments.forEach((comment) => console.log(comment.user)));
  return (
    <AuthenticatedLayout
      header={
        <h2 className="flex items-center gap-10 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          <Link prefetch href={route("post.index")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <span>Post</span>
        </h2>
      }
    >
      <Head title={"Post " + post.name} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
              <PostUpvoteDownvote post={post} />
              <div className="flex-1">
                <p className="text-xl mb-2">{post.content}</p>
                {post.comments && (
                  <div className="mt-8">
                    <NewCommentForm user={user} postItem={post} />
                    {post.comments.map((comment) => (
                      <CommentItem
                        comment={comment}
                        key={comment.id}
                        user={user}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
