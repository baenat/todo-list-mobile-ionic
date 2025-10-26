import { TaskRepository } from "../../repositories/task.repository";
import { TaskEntity } from "../../entities/task.entity";

export class UpdateTaskUseCase {

  constructor(private repo: TaskRepository) { }

  async execute(task: TaskEntity): Promise<void> {
    if (!task.title) throw new Error('El título es obligatorio');
    await this.repo.updateTask(task);
  }
}
