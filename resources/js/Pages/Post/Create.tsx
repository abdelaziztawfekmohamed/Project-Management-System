import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Post, PaginatedData } from "@/types";
import PostItem from "@/Components/PostItem";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler, useState } from "react";
import TextAreaInput from "@/Components/TextAreaInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create() {
  const { data, setData, processing, errors, post } = useForm({
    content: "",
  });

  const [content, setContent] = useState(data.content);

  const createPost: FormEventHandler = (ev) => {
    ev.preventDefault();

    post(route("post.store"), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create New Post
        </h2>
      }
    >
      <Head title="Create New Post" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
              <form onSubmit={createPost} className="w-full">
                <div className="mb-8">
                  <InputLabel htmlFor="content" value="Content" />

                  <TextAreaInput
                    id="content"
                    rows={6}
                    className="mt-1 block w-full"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                  />

                  <InputError className="mt-2" message={errors.content} />
                </div>

                <div className="flex items-center gap-4">
                  <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
