import { ROLES } from 'src/constants/roles';
import { CreateUserDTO } from 'src/users/dto/users.dto';
import { STATUS } from 'src/constants/status';
import { CreateTaskDTO } from 'src/tasks/dto/task.dto';
import { CreateUserDTO, CreateUserTaskDTO } from 'src/users/dto/users.dto';
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
export const userTaskSample: CreateUserTaskDTO = {
  user: uuidSample,
  task: uuidSample,
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
