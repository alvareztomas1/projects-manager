import { ACCESS_LEVEL } from '../constants/access-levels';
import { ROLES } from '../constants/roles';
import { ProjectData } from './project.type';
import { TaskData } from './task.type';

export type UserSignUpData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type UserLoginData = {
  userIdentifier: string;
  password: string;
};

export type UserData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ROLES;
  projectsIncluded: UserProjectData[];
  tasksIncluded: UserTask[];
};

export type UserProjectData = {
  accessLevel: ACCESS_LEVEL;
  id: string;
  createdAt: string;
  updatedAt: string;
  project: ProjectData;
};

export type UserTask = {
  id: string;
  createdAt: string;
  updatedAt: string;
  task: TaskData;
};

export type UserToProject = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
};
