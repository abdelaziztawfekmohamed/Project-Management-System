import { Task } from "./task";

export interface Meta {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface Tasks {
  data: Task[];
  meta: Meta;
}
