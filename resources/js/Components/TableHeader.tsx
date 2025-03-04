import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import React from "react";
interface TableHeaderProps {
  name: string;
  sortable?: boolean;
  sort_field: string | null;
  sort_direction: string | null;
  sortChanged: (name: string) => void;
  children: React.ReactNode;
}
const TableHeader = ({
  name,
  sortable = true,
  sort_field,
  sort_direction,
  sortChanged = (name: string) => {},
  children,
}: TableHeaderProps) => {
  return (
    <th onClick={(e) => sortChanged(name)}>
      <div className="px-3 py-3 flex max-width items-center gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-white"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
};
export default TableHeader;
