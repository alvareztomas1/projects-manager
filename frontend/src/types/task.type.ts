import { STATUS } from '../constants/status';

export type TaskData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  status: STATUS;
};

export type AddTask = {
  title: string;
  description: string;
  status: STATUS;
};
