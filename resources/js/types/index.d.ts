import { QueryParams } from "./queryParams";
import { Projects } from "./projects";
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
}
export interface Meta {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}
export interface Users {
  data: User[];
  meta: Meta;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  PageProps: {
    projects: Projects;
    queryParams?: QueryParams | null;
    success: "srting" | null;
  };
};
