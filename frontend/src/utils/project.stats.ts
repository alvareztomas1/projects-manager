import { ACCESS_LEVEL } from '../constants/access-levels';
import { STATUS } from '../constants/status';
import {
  ProjectTasksStats,
  UserInProjectData,
  ProjectUserStats,
} from '../types/project.type';
import { TaskData } from '../types/task.type';

interface IGetProjectStats {
  projectTasksStats: ProjectTasksStats;
  projectUserStats: ProjectUserStats;
}

export const getProjectStats = (
  projectTasks: TaskData[],
  projectsUsers: UserInProjectData[],
): IGetProjectStats => {
  return {
    projectTasksStats: {
      totalTasks: projectTasks.length || 0,
      totalPending:
        projectTasks.filter((task) => task.status === STATUS.PENDING).length ||
        0,
      totalInProgress:
        projectTasks.filter((task) => task.status === STATUS.IN_PROGRESS)
          .length || 0,
      totalComplete:
        projectTasks.filter((task) => task.status === STATUS.COMPLETE).length ||
        0,
    },
    projectUserStats: {
      totalUsers: projectsUsers.length || 0,
      totalBasic:
        projectsUsers.filter(
          (userProject) => +userProject.accessLevel === +ACCESS_LEVEL.BASIC,
        ).length || 0,
      totalMaintaner:
        projectsUsers.filter(
          (userProject) =>
            +userProject.accessLevel === +ACCESS_LEVEL.MAINTAINER,
        ).length || 0,
      totalOwner:
        projectsUsers.filter(
          (userProject) => +userProject.accessLevel === +ACCESS_LEVEL.OWNER,
        ).length || 0,
    },
  };
};

export const calculatePercentage = (
  numerator: number,
  denominator: number,
): number => {
  const percentage = (numerator / denominator) * 100;
  return Number(percentage.toFixed(1));
};
