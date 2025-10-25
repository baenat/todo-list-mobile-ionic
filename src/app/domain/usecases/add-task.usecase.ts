import { TaskRepository } from "../repositories/task.repository";
import { TaskEntity } from "../entities/task.entity";

export class AddTaskUseCase {

  constructor(private repo: TaskRepository) { }

  async execute(task: TaskEntity): Promise<void> {
    if (!task.title) throw new Error('El título es obligatorio');
    await this.repo.addTask(task);
  }
}
