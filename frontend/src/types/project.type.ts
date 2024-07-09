import { ACCESS_LEVEL } from '../constants/access-levels';
import { TaskData } from './task.type';
import { UserData, UserToProject } from './user.type';

export type ProjectData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  usersIncluded: UserInProjectData[];
  tasks: TaskData[];
};

export type UserInProjectData = {
  accessLevel: ACCESS_LEVEL;
  id: string;
  createdAt: string;
  updatedAt: string;
  user: UserData;
};

export type AddUserToProjectData = {
  user: UserToProject;
  accessLevel: ACCESS_LEVEL;
};

export type CreateProjectType = {
  title: string;
  description: string;
};

export type ProjectTasksStats = {
  totalTasks: number;
  totalPending: number;
  totalInProgress: number;
  totalComplete: number;
};

export type ProjectUserStats = {
  totalUsers: number;
  totalBasic: number;
  totalMaintaner: number;
  totalOwner: number;
};
