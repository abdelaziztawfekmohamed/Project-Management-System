import { Post, User, Comment } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import PostActionsDropdown from "../Components/PostActionsDropdown";
import PostUpvoteDownvote from "../Components/PostUpvoteDownvote";
import NewCommentForm from "./NewCommentForm";
import CommentItem from "./CommentItem";

export default function PostItem({
  post,
  user,
  comments,
}: {
  post: Post;
  user: User;
  comments: Comment[];
}) {
  // const [isExpanded, setIsExpanded] = useState(false);

  // const toggleReadMore = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        <PostUpvoteDownvote post={post} />
        <div className="flex-1">
          <div className="flex items-center mb-4 gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl">
              {post.user.name}
              <span className="text-gray-500 text-xs ml-4">
                {post.created_at}
              </span>
            </h3>
          </div>
          <Link prefetch href={route("post.show", post)}>
            <h2 className="text-lg mb-2">
              {/* {(post.content || "").length <= 200 && <p>{post.content}</p>}{" "}
              {(post.content || "").length > 200 && (
                <>
                  <p>
                    {isExpanded
                      ? post.content
                      : `${(post.content || "").slice(0, 200)}...`}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadMore;
                    }}
                    className="text-amber-500 hover:underline"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </>
              )} */}
              {(post.content || "").length > 300 ? (
                <>
                  {(post.content || "").slice(0, 300)}
                  <> </>
                  <span className="text-amber-500 hover:underline">
                    show more...
                  </span>
                </>
              ) : (
                post.content
              )}
            </h2>
          </Link>

          {comments && (
            <div className="mt-8">
              <NewCommentForm user={user} postItem={post} />
              {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} user={user} />
              ))}
            </div>
          )}
        </div>
        <div>
          <PostActionsDropdown post={post} user={user} />
        </div>
      </div>
    </div>
  );
}
