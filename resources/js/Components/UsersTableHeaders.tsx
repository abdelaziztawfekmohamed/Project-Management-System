import TableHeader from "./TableHeader";
import { QueryParams } from "@/types/queryParams";
interface TableHeadersProps {
  queryParams: QueryParams | null;
  sortChanged: (name: string) => void;
}

const UsersTableHeaders = ({ queryParams, sortChanged }: TableHeadersProps) => {
  return (
    <tr className="text-nowrap">
      <TableHeader
        name="id"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        ID
      </TableHeader>
      {/* <th className="px-3 py-3">Image</th> */}
      <TableHeader
        name="name"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Name
      </TableHeader>

      <TableHeader
        name="email"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Email
      </TableHeader>

      <TableHeader
        name="created_at"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Create Date
      </TableHeader>

      <th className="px-3 py-3">Actions</th>
    </tr>
  );
};

export default UsersTableHeaders;
