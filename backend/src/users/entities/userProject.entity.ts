import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IUserProject } from '../interfaces/user.interface';
import { UserEntity } from './user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';

@Entity({ name: 'users_projects' })
export class UserProjectEntity extends BaseEntity implements IUserProject {
  @Column()
  accessLevel!: string;

  @ManyToOne(() => UserEntity, (user) => user.projectsIncluded, {
    onDelete: 'CASCADE',
  })
  user!: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.usersIncluded, {
    onDelete: 'CASCADE',
  })
  project!: ProjectEntity;
}
