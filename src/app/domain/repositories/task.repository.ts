import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
  abstract getTasks(idTask?: string): Promise<TaskEntity[]>;
  abstract addTask(task: TaskEntity): Promise<void>;
  abstract updateTask(task: TaskEntity): Promise<void>;
  abstract deleteTask(id: string): Promise<void>;
}
