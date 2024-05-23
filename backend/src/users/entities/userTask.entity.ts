import { BaseEntity } from 'src/config/base.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_tasks' })
export class UserTaskEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.tasksIncluded, {
    onDelete: 'CASCADE',
  })
  user!: UserEntity;

  @ManyToOne(() => TaskEntity, (task) => task.usersIncluded, {
    onDelete: 'CASCADE',
  })
  task!: TaskEntity;
}
