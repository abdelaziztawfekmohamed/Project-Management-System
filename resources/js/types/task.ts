import { User } from "./index";
import { Status } from "@/constants";
import { Project } from "./project";

export interface Task {
  id: number;
  name: string;
  description: string;
  project: Project;
  priority: string;
  due_date: string;
  assigned_user_id: number;
  status: keyof Status;
  image_path: string;
  created_at: string;
  assignedUser: User;
  created_by: User;
  updated_by: User;
}
