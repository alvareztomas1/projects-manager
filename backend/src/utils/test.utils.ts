import { ROLES } from 'src/constants/roles';
import { CreateUserDTO } from 'src/users/dto/users.dto';

export const userSample: CreateUserDTO = {
  username: 'user',
  email: 'user@email.com',
  password: 'password',
  role: ROLES.BASIC,
  firstName: 'user',
  lastName: 'name',
};

export const guardMock = {
  canActivate: jest.fn().mockImplementation(() => {
    return true;
  }),
};
