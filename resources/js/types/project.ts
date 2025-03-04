import { Status } from "@/constants";
import { User } from "./index";

export interface Project {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: keyof Status;
  image_path: string;
  created_at: string;
  created_by: User;
  updated_by: User;
}
