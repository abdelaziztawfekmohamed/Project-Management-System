import TableHeader from "./TableHeader";
import { QueryParams } from "@/types/queryParams";
interface TableHeadersProps {
  queryParams: QueryParams | null;
  sortChanged: (name: string) => void;
  hideProjectColumn: boolean;
}

const TableHeaders = ({
  queryParams,
  sortChanged,
  hideProjectColumn = false,
}: TableHeadersProps) => {
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
      {!hideProjectColumn && <th className="px-3 py-3">Project Name</th>}
      <TableHeader
        name="name"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Name
      </TableHeader>

      <TableHeader
        name="status"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Status
      </TableHeader>

      <TableHeader
        name="created_at"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Create Date
      </TableHeader>

      <TableHeader
        name="due_date"
        sort_field={queryParams?.sort_field || null}
        sort_direction={queryParams?.sort_direction || null}
        sortChanged={sortChanged}
      >
        Due Date
      </TableHeader>
      <th className="px-3 py-3">Created By</th>
      <th className="px-3 py-3">Updated By</th>
      <th className="px-3 py-3 text-right">Actions</th>
    </tr>
  );
};

export default TableHeaders;
