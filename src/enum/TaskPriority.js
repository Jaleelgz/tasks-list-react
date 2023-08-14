export const TaskPriority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const TaskPriorityFilterOptions = [
  "All",
  ...Object.values(TaskPriority),
];
