import { Post } from "@/types";
import { useForm } from "@inertiajs/react";

export default function PostUpvoteDownvote({ post }: { post: Post }) {
  const upvoteForm = useForm({
    upvote: true,
  });

  const downvoteForm = useForm({
    upvote: false,
  });

  const upvoteDownvote = (upvote: boolean) => {
    if (
      (post.user_has_upvoted && upvote) ||
      (post.user_has_downvoted && !upvote)
    ) {
      upvoteForm.delete(route("upvote.destroy", post.id), {
        preserveScroll: true,
      });
    } else {
      let form = null;
      if (upvote) {
        form = upvoteForm;
      } else {
        form = downvoteForm;
      }

      form.post(route("upvote.store", post.id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => upvoteDownvote(true)}
        className={post.user_has_upvoted ? "text-amber-600" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12"
        >
          <path
            fillRule="evenodd"
            d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span
        className={
          "text-2xl font-semibold " +
          (post.user_has_upvoted || post.user_has_downvoted
            ? "text-amber-600"
            : "")
        }
      >
        {post.upvote_count}
      </span>
      <button
        onClick={() => upvoteDownvote(false)}
        className={post.user_has_downvoted ? "text-amber-600" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
