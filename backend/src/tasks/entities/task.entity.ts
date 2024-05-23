import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ITask } from '../interface/task.interface';
import { STATUS } from 'src/constants/status';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { UserTaskEntity } from 'src/users/entities/userTask.entity';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: STATUS })
  status!: STATUS;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
  })
  project!: ProjectEntity;

  @OneToMany(() => UserTaskEntity, (userTask) => userTask.task, {
    onDelete: 'CASCADE',
  })
  usersIncluded!: UserTaskEntity[];
}
