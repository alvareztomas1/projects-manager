import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity } from 'typeorm';
import { IProject } from '../interfaces/projects.interface';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  title!: string;

  @Column()
  description!: string;
}
