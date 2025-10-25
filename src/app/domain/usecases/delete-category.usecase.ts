import { TaskRepository } from "../repositories/task.repository";

export class DeleteTaskUseCase {

  constructor(private repo: TaskRepository) { }

  async execute(idTask: string): Promise<void> {
    if (!idTask) throw new Error('El ID es obligatorio');
    await this.repo.deleteTask(idTask);
  }
}
