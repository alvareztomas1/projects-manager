import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { ROLES } from 'src/constants/roles';
import { Exclude } from 'class-transformer';
import { UserProjectEntity } from './userProject.entity';

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

  @Column({ type: 'enum', enum: ROLES })
  role!: ROLES;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.user, {
    onDelete: 'CASCADE',
  })
  projectsIncluded!: UserProjectEntity[];
}
