import { STATUS } from 'src/constants/status';

export interface ITask {
  title: string;
  description: string;
  status: STATUS;
}
