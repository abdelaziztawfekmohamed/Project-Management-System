import TextInput from "@/Components/TextInput";
import { KeyPressEvent } from "@/types/keyPressEvent";
import { QueryParams } from "@/types/queryParams";

interface TableFiltersProps {
  name: string;
  queryParams: QueryParams | null;
  searchFieldChanged: (params: { name: string; value: string }) => void;
  onKeyPress: (name: string, e: KeyPressEvent) => void;
}

const UsersTableFilters = ({
  name,
  queryParams,
  searchFieldChanged,
  onKeyPress,
}: TableFiltersProps) => {
  return (
    <tr className="text-nowrap">
      <th className="px-3 py-3"></th>
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
        <TextInput
          className="w-full"
          defaultValue={queryParams?.email || ""}
          placeholder={`${name} Email`}
          onBlur={(e) =>
            searchFieldChanged({
              name: "email",
              value: e.target.value,
            })
          }
          onKeyUp={(e) => onKeyPress("email", e as KeyPressEvent)}
        />
      </th>
      <th className="px-3 py-3"></th>
      <th className="px-3 py-3"></th>
    </tr>
  );
};

export default UsersTableFilters;
