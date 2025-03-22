import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableHeaders from "@/Components/TableHeaders";
import TableFilters from "@/Components/TableFilters";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Task } from "@/types/task";
import { Tasks } from "@/types/tasks";
import { QueryParams } from "@/types/queryParams";
import { useSearch } from "@/Hooks/useSearch";
import { useSort } from "@/Hooks/useSort";
import { useState } from "react";
import Modal from "./Modal";
interface IndexProps {
  tasks: Tasks;
  queryParams?: QueryParams | null;
  // page: number;
  hideProjectColumn: boolean;
}

const TasksTable = ({
  tasks,
  queryParams,
  hideProjectColumn = false,
}: IndexProps) => {
  const { searchFieldChanged, onKeyPress } = useSearch({
    queryParams,
    routeName: "task.index",
  });

  const { sortChanged } = useSort({ queryParams, routeName: "task.index" });

  const updatedParams = { ...queryParams };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const prevRouteName = tasks.meta.path.split("/")[3];

  const deleteTask = (task: Task) => {
    // if (!window.confirm("Are you sure you want to delete the Task?")) {
    //   return;
    // }
    router.delete(
      route("task.destroy", {
        task: task.id,
        page: tasks.meta.current_page,
      })
    );
  };

  return (
    <>
      <Head title="Tasks" />
      {/* {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )} */}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <TableHeaders
              queryParams={updatedParams}
              sortChanged={sortChanged}
              hideProjectColumn={hideProjectColumn}
            />
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <TableFilters
              name="Task"
              queryParams={updatedParams}
              searchFieldChanged={searchFieldChanged}
              onKeyPress={onKeyPress}
              hideProjectColumn={hideProjectColumn}
            />
          </thead>
          <tbody>
            {tasks.data.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No Tasks found.
                </td>
              </tr>
            ) : (
              tasks.data.map((task) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={task.id}
                >
                  <td className="px-3 py-2">{task.id}</td>
                  {/* <td className="px-3 py-2">
                            <img src={task.image_path} style={{ width: 60 }} />
                          </td> */}
                  {!hideProjectColumn && (
                    <td className="px-3 py-2 text-nowrap">
                      {task.project.name}
                    </td>
                  )}
                  <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                    <Link href={route("task.show", task.id)}>{task.name}</Link>
                  </th>
                  <td className="px-5 py-2 text-center">
                    <span
                      className={`px-4 py-1 rounded text-white ${
                        TASK_STATUS_CLASS_MAP[task.status]
                      }`}
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                  <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                  <td className="px-3 py-2">
                    {task.created_by?.name ?? "N/A"}
                  </td>
                  <td className="px-3 py-2">
                    {task.updated_by?.name ?? "N/A"}
                  </td>
                  <td className="px-3 py-2 text-nowrap">
                    <Link
                      href={route("task.edit", {
                        task: task.id,
                        page: tasks.meta.current_page,
                        prevRouteName: prevRouteName,
                      })}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        setTaskToDelete(task);
                        setIsModalOpen(true);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
      {/* Modal for delete confirmation */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
      >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Confirm Deletion
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete the project "{taskToDelete?.name}
            "?
          </p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (taskToDelete) {
                  deleteTask(taskToDelete);
                  setIsModalOpen(false);
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Yes, delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TasksTable;
