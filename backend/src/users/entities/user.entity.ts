import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';
import { UserProjectEntity } from './userProject.entity';
import { UserTaskEntity } from './userTask.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  role!: string;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.user, {
    onDelete: 'CASCADE',
  })
  projectsIncluded!: UserProjectEntity[];

  @OneToMany(() => UserTaskEntity, (userTask) => userTask.user, {
    onDelete: 'CASCADE',
  })
  tasksIncluded!: UserTaskEntity[];
}
