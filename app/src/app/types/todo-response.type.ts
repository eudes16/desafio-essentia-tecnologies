
export type TodoResponse = {
    id: number;
    userId: number;
    title: string;
    description: string;
    priority: TodoPriority;
    status: TodoStatus;
    dueDate: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export enum TodoPriority {
    low = "low",
    medium = "medium",
    high = "high",
}

export enum TodoStatus {
    pending = "pending",
    inProgress = "in_progress",
    completed = "completed",
    cancelled = "cancelled",
}