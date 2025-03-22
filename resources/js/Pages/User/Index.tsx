import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { QueryParams } from "@/types/queryParams";
import { useSearch } from "@/Hooks/useSearch";
import { useSort } from "@/Hooks/useSort";
import FlashMessage from "@/Components/FlashMessage";
import { User, Users } from "@/types";
import UsersTableHeaders from "@/Components/UsersTableHeaders";
import UsersTableFilters from "@/Components/UsersTableFilters";
import { useState } from "react";
import Modal from "@/Components/Modal";
import { can } from "@/helpers";
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

  const authUser = usePage().props.auth.user;
  console.log(authUser);
  console.log(users);

  const { sortChanged } = useSort({ queryParams, routeName: "user.index" });

  const updatedParams = { ...queryParams };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const deleteUser = (user: User) => {
    router.delete(
      route("user.destroy", { user: user.id, page: users.meta.currentPage })
    );
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
                          {(can(user, "edit_users") ||
                            can(user, "delete_users")) && (
                            <td className="px-3 py-2 text-nowrap">
                              <Link
                                href={route("user.edit", {
                                  user: user.id,
                                  page: users.meta.currentPage,
                                })}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={(e) => {
                                  setUserToDelete(user);
                                  setIsModalOpen(true);
                                }}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                              >
                                Delete
                              </button>
                            </td>
                          )}
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
            Are you sure you want to delete the project "{userToDelete?.name}
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
                if (userToDelete) {
                  deleteUser(userToDelete);
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
    </AuthenticatedLayout>
  );
};

export default Index;
