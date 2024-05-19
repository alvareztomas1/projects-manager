import { ACCESS_LEVEL } from 'src/constants/access-levels';
import { ROLES } from 'src/constants/roles';
import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';

export interface IUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ROLES;
}

export interface IUserProject {
  accessLevel: ACCESS_LEVEL;
  user: UserEntity;
  project: ProjectEntity;
}
