import { STATUS } from '../constants/status';
import { UserData } from './user.type';

export type TaskData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  status: STATUS;
  usersIncluded: UserData[];
};

export type AddTask = {
  title: string;
  description: string;
  status: STATUS;
};
