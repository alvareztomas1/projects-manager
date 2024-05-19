import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../interfaces/projects.interface';
import { UserProjectEntity } from 'src/users/entities/userProject.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.project, {
    onDelete: 'CASCADE',
  })
  usersIncluded!: UserProjectEntity[];
}
