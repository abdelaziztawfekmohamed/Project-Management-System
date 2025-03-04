import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Tasks } from "@/types/tasks";
import { QueryParams } from "@/types/queryParams";
import TasksTable from "@/Components/TasksTable";
import FlashMessage from "@/Components/FlashMessage";

interface IndexProps {
  tasks: Tasks;
  queryParams?: QueryParams | null;
  success: string | null;
}

const Index = ({ tasks, queryParams, success }: IndexProps) => {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Tasks
          </h2>
          <Link
            href={route("task.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )} */}
          <FlashMessage message={success} />

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                success={success}
                hideProjectColumn={false}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
