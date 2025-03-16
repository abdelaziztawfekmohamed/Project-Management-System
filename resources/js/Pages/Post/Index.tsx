import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, usePoll } from "@inertiajs/react";
import { Post, PaginatedData, User } from "@/types";
import PostItem from "@/Components/PostItem";
import { can } from "@/helpers";

interface IndexProps {
  posts: PaginatedData<Post>;
  user: User;
}

export default function Index({ posts, user }: IndexProps) {
  usePoll(3000);
  // console.log(user);
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Posts
        </h2>
      }
    >
      <Head title="Posts" />

      {can(user, "manage_posts") && (
        <div className="mb-8">
          <Link
            href={route("post.create")}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
          >
            Create New Post
          </Link>
        </div>
      )}
      {posts.data.map((post) => (
        <PostItem post={post} key={post.id} user={user} />
      ))}
    </AuthenticatedLayout>
  );
}
