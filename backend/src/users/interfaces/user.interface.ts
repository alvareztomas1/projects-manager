import { ROLES } from 'src/constants/roles';

export interface IUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ROLES;
}
