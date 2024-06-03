import { AuthDTO } from 'src/auth/dto/auth.dto';
import { ACCESS_LEVEL } from 'src/constants/access-levels';
import { ROLES } from 'src/constants/roles';
import { STATUS } from 'src/constants/status';
import { CreateProjectDTO } from 'src/projects/dto/projects.dto';
import { CreateTaskDTO } from 'src/tasks/dto/task.dto';
import {
  CreateUserDTO,
  CreateUserTaskDTO,
  CreateUserToProjectDTO,
} from 'src/users/dto/users.dto';

export const uuidSample = '550e8400-e29b-41d4-a716-446655440000';

export const userSample: CreateUserDTO = {
  username: 'user',
  email: 'user@email.com',
  password: 'password',
  role: ROLES.BASIC,
  firstName: 'user',
  lastName: 'name',
};

export const taskSample: CreateTaskDTO = {
  title: 'title',
  description: 'description',
  status: STATUS.PENDING,
};

export const projectSample: CreateProjectDTO = {
  title: 'title',
  description: 'description',
};

export const userTaskSample: CreateUserTaskDTO = {
  user: uuidSample,
  task: uuidSample,
};

export const userProjectSample: CreateUserToProjectDTO = {
  user: uuidSample,
  project: uuidSample,
  accessLevel: ACCESS_LEVEL.BASIC,
};

export const authSample: AuthDTO = {
  userIdentifier: 'user',
  password: 'password',
};

export const guardMock = {
  canActivate: jest.fn().mockImplementation(() => {
    return true;
  }),
};

export const errorSample = {
  statusCode: 400,
  message: 'BAD_REQUEST :: error',
};
