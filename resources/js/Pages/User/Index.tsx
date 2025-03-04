import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { QueryParams } from "@/types/queryParams";
import { useSearch } from "@/Hooks/useSearch";
import { useSort } from "@/Hooks/useSort";
import FlashMessage from "@/Components/FlashMessage";
import { User, Users } from "@/types";
import UsersTableHeaders from "@/Components/UsersTableHeaders";
import UsersTableFilters from "@/Components/UsersTableFilters";
interface IndexProps {
  users: Users;
  queryParams?: QueryParams | null;
  success: string | null;
}

const Index = ({ users, queryParams, success }: IndexProps) => {
  const { searchFieldChanged, onKeyPress } = useSearch({
    queryParams,
    routeName: "user.index",
  });

  const { sortChanged } = useSort({ queryParams, routeName: "user.index" });

  const updatedParams = { ...queryParams };

  const deleteUser = (user: User) => {
    if (!window.confirm("Are you sure you want to delete the user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="users" />

      {/* <pre> {JSON.stringify(users, undefined, 2)} </pre> */}

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
                    <UsersTableHeaders
                      queryParams={updatedParams}
                      sortChanged={sortChanged}
                    />
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <UsersTableFilters
                      name="User"
                      queryParams={updatedParams}
                      searchFieldChanged={searchFieldChanged}
                      onKeyPress={onKeyPress}
                    />
                  </thead>
                  <tbody>
                    {users.data.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.data.map((user) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={user.id}
                        >
                          <td className="px-3 py-2">{user.id}</td>
                          {/* <td className="px-3 py-2">
                            <img
                              src={user.image_path}
                              style={{ width: 60 }}
                            />
                          </td> */}
                          <th className="px-3 py-2 text-gray-100 text-nowrap">
                            {user.name}
                          </th>
                          <th className="px-3 py-2 text-gray-100 text-nowrap">
                            {user.email}
                          </th>
                          <th className="px-3 py-2 text-gray-100 text-nowrap">
                            {user.created_at}
                          </th>

                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("user.edit", user.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => deleteUser(user)}
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
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
