import { useCallback } from "react";
import { router } from "@inertiajs/react";
import { QueryParams } from "@/types/queryParams";

interface UseSearchProps {
  queryParams?: QueryParams | null;
  routeName: string;
}

export const useSearch = ({ queryParams, routeName }: UseSearchProps) => {
  const searchFieldChanged = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      const updatedParams = { ...queryParams };
      if (value) {
        updatedParams[name] = value;
      } else {
        delete updatedParams[name];
      }
      router.get(route(routeName), updatedParams);
    },
    [queryParams, routeName]
  );

  const onKeyPress = useCallback(
    (name: string, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      searchFieldChanged({ name, value: e.currentTarget.value });
    },
    [searchFieldChanged]
  );

  return { searchFieldChanged, onKeyPress };
};
