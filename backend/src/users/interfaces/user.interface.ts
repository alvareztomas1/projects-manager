import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';

export interface IUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IUserProject {
  accessLevel: string;
  user: UserEntity;
  project: ProjectEntity;
}
