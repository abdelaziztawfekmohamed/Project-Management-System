import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Status } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project } from "@/types/project";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Edit({
  project,
  page,
}: {
  project: Project;
  page: number;
}) {
  const { data, setData, put, errors, reset } = useForm({
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    // page: page || 1,
  });
  console.log(data);
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("project.update", project.id));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Project "{project.name}"
          </h2>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />

                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Project Description"
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Project Deadline"
                />

                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" />

                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full"
                  value={data.status}
                  onChange={(e) =>
                    setData("status", e.target.value as keyof Status)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("project.index", { page: page })}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
