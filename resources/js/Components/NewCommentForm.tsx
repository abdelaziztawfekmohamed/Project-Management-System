import { Post, User } from "@/types";
import TextAreaInput from "@/Components/TextAreaInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function NewCommentForm({
  postItem,
  user,
}: {
  postItem: Post;
  user: User;
}) {
  const { data, setData, post, processing, reset } = useForm({
    comment: "",
  });

  const createComment: FormEventHandler = (ev) => {
    ev.preventDefault();

    post(route("comment.store", postItem.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        reset("comment");
      },
      onError: (errors) => {
        console.log("errors", errors);
      },
    });
  };

  return (
    <form
      onSubmit={createComment}
      className="py-2 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4"
    >
      <div className="flex items-center gap-3">
        <TextAreaInput
          rows={1}
          value={data.comment}
          onChange={(e) => setData("comment", e.target.value)}
          className="mt-1 block w-full"
          placeholder="Your comment"
        ></TextAreaInput>
        <PrimaryButton disabled={processing}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>{" "}
        </PrimaryButton>
      </div>
    </form>
  );
}
