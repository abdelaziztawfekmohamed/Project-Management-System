import { Post, User } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import PostActionsDropdown from "../Components/PostActionsDropdown";
import PostUpvoteDownvote from "../Components/PostUpvoteDownvote";

export default function PostItem({ post, user }: { post: Post; user: User }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        <PostUpvoteDownvote post={post} />
        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            <Link prefetch href={route("post.show", post)}>
              {post.name}
            </Link>
          </h2>
          {(post.description || "").length > 200 && (
            <>
              <p>
                {isExpanded
                  ? post.description
                  : `${(post.description || "").slice(0, 200)}...`}
              </p>

              <button
                onClick={toggleReadMore}
                className="text-amber-500 hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          )}
          {(post.description || "").length <= 200 && <p>{post.description}</p>}

          <div className="py-4">
            <Link
              prefetch
              href={route("post.show", post)}
              className="inline-flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Comments
            </Link>
          </div>
        </div>
        <div>
          <PostActionsDropdown post={post} user={user} />
        </div>
      </div>
    </div>
  );
}
