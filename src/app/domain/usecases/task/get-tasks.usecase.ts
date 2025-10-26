import { TaskEntity } from "@domain/entities/task.entity";
import { TaskRepository } from "../../repositories/task.repository";

export class GetTaskUseCase {

  constructor(private repo: TaskRepository) { }

  async execute(idTask?: string): Promise<TaskEntity[]> {
    return await this.repo.getTasks(idTask);
  }
}
