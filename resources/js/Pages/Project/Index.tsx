import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableHeaders from "@/Components/TableHeaders";
import TableFilters from "@/Components/TableFilters";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { Project } from "@/types/project";
import { Projects } from "@/types/projects";
import { QueryParams } from "@/types/queryParams";
import { useSearch } from "@/Hooks/useSearch";
import { useSort } from "@/Hooks/useSort";
import FlashMessage from "@/Components/FlashMessage";
interface IndexProps {
  projects: Projects;
  queryParams?: QueryParams | null;
  success: string | null;
}

const Index = ({ projects, queryParams, success }: IndexProps) => {
  const { searchFieldChanged, onKeyPress } = useSearch({
    queryParams,
    routeName: "project.index",
  });

  const { sortChanged } = useSort({ queryParams, routeName: "project.index" });

  const updatedParams = { ...queryParams };

  const deleteProject = (project: Project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="projects" />

      {/* <pre> {JSON.stringify(projects, undefined, 2)} </pre> */}

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
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <TableHeaders
                      queryParams={updatedParams}
                      sortChanged={sortChanged}
                      hideProjectColumn={true}
                    />
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <TableFilters
                      name="Project"
                      queryParams={updatedParams}
                      searchFieldChanged={searchFieldChanged}
                      onKeyPress={onKeyPress}
                      hideProjectColumn={true}
                    />
                  </thead>
                  <tbody>
                    {projects.data.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          No projects found.
                        </td>
                      </tr>
                    ) : (
                      projects.data.map((project) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={project.id}
                        >
                          <td className="px-3 py-2">{project.id}</td>
                          {/* <td className="px-3 py-2">
                            <img
                              src={project.image_path}
                              style={{ width: 60 }}
                            />
                          </td> */}
                          <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                            <Link href={route("project.show", project.id)}>
                              {project.name}
                            </Link>
                          </th>
                          <td className="px-5 py-2 text-center">
                            <span
                              className={`px-4 py-1 rounded text-white ${
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }`}
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {project.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {project.due_date}
                          </td>
                          <td className="px-3 py-2">
                            {project.created_by?.name ?? "N/A"}
                          </td>
                          <td className="px-3 py-2">
                            {project.updated_by?.name ?? "N/A"}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("project.edit", project.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => deleteProject(project)}
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
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
