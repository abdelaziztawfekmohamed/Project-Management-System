export interface Status {
  pending: string;
  in_progress: string;
  completed: string;
}

export interface Priority {
  low: string;
  medium: string;
  high: string;
}

export const PROJECT_STATUS_CLASS_MAP: Status = {
  pending: "bg-amber-500 ! px-6",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

export const PROJECT_STATUS_TEXT_MAP: Status = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const TASK_STATUS_CLASS_MAP: Status = {
  pending: "bg-amber-500 ! px-6",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

export const TASK_STATUS_TEXT_MAP: Status = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const TASK_PRIORITY_CLASS_MAP: Priority = {
  low: "bg-gray-600",
  medium: "bg-amber-600",
  high: "bg-red-600",
};

export const TASK_PRIORITY_TEXT_MAP: Priority = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
