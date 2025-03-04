import React from "react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { KeyPressEvent } from "@/types/keyPressEvent";
import { QueryParams } from "@/types/queryParams";

interface TableFiltersProps {
  name: string;
  queryParams: QueryParams | null;
  hideProjectColumn: boolean;
  searchFieldChanged: (params: { name: string; value: string }) => void;
  onKeyPress: (name: string, e: KeyPressEvent) => void;
}

const TableFilters = ({
  name,
  queryParams,
  searchFieldChanged,
  onKeyPress,
  hideProjectColumn = false,
}: TableFiltersProps) => {
  return (
    <tr className="text-nowrap">
      <th className="px-3 py-3"></th>
      {/* <th className="px-3 py-3"></th> */}
      {!hideProjectColumn && <th className="px-3 py-3"></th>}
      <th className="px-3 py-3">
        <TextInput
          className="w-full"
          defaultValue={queryParams?.name || ""}
          placeholder={`${name} Name`}
          onBlur={(e) =>
            searchFieldChanged({
              name: "name",
              value: e.target.value,
            })
          }
          onKeyUp={(e) => onKeyPress("name", e as KeyPressEvent)}
        />
      </th>
      <th className="px-3 py-3">
        <SelectInput
          className="w-full w-max"
          defaultValue={queryParams?.status || ""}
          onChange={(e) =>
            searchFieldChanged({
              name: "status",
              value: e.target.value,
            })
          }
        >
          <option value="">Select </option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </SelectInput>
      </th>
      <th className="px-3 py-3"></th>
      <th className="px-3 py-3"></th>
      <th className="px-3 py-3"></th>
      <th className="px-3 py-3"></th>
      <th className="px-3 py-3"></th>
    </tr>
  );
};

export default TableFilters;
