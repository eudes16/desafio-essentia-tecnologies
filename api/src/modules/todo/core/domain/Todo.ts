export default interface Todo {
    id: number;
    userId: number;
    title: string;
    description?: string;
    dueDate?: Date;
    priority: TodoPriority;
    status: TodoStatus;
    createdAt: Date
    updatedAt?: Date | null;
    deletedAt?: Date | null;
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