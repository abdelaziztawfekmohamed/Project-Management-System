import { QueryParams } from "./queryParams";
import { Projects } from "./projects";

// interface Permission {
//   id: number;
//   name: string;
//   created_at?: string;
//   updated_at?: string;
// }

// interface Role {
//   id: number;
//   name: string;
//   guard_name: string;
//   created_at?: string;
//   updated_at?: string;
//   permissions?: string[];
// }

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  permissions: string[];
  roles: string[];
}

export type PaginatedData<T = any> = {
  data: T[];
  links: Record<string, string>;
};

export type Comment = {
  id: number;
  comment: string;
  created_at: string;
  user: User;
};

export type Post = {
  id: number;
  name: string;
  content: string;
  user: User;
  created_at: string;
  upvote_count: number;
  user_has_upvoted: boolean;
  user_has_downvoted: boolean;
  comments: Comment[];
};

export interface Meta {
  [x: string]: unknown;
  currentPage: any;
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
