import { useCallback } from "react";
import { router } from "@inertiajs/react";
import { QueryParams } from "@/types/queryParams";

interface UseSortProps {
  queryParams?: QueryParams | null;
  routeName: string;
}

export const useSort = ({ queryParams = {}, routeName }: UseSortProps) => {
  const sortChanged = useCallback(
    (name: string) => {
      const updatedParams = { ...queryParams };
      if (name === updatedParams.sort_field) {
        updatedParams.sort_direction =
          updatedParams.sort_direction === "asc" ? "desc" : "asc";
      } else {
        updatedParams.sort_field = name;
        updatedParams.sort_direction = "asc";
      }
      router.get(route(routeName), updatedParams);
    },
    [queryParams, routeName]
  );

  return { sortChanged };
};
