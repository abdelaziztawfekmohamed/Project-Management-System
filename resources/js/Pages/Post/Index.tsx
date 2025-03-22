import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Post, PaginatedData, User } from "@/types";
import PostItem from "@/Components/PostItem";
import { can } from "@/helpers";
import FlashMessage from "@/Components/FlashMessage";

interface IndexProps {
  posts: PaginatedData<Post>;
  user: User;
  success: string | null;
}

export default function Index({ posts, user, success }: IndexProps) {
  usePoll(3000, { only: ["success"] });
  // console.log(posts.data[0].comments);
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          <div className="my-2 mx-3">
            <Link
              href={route("post.create")}
              className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
            >
              Post something
            </Link>
          </div>
        </h2>
      }
    >
      <Head title="Posts" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && <FlashMessage message={success} />}

          {posts.data.map((post) => (
            <PostItem
              post={post}
              key={post.id}
              comments={post.comments}
              user={user}
            />
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
