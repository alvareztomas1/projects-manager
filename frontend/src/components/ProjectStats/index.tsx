import React from 'react';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { TaskData } from '../../types/task.type';
import { UserInProjectData } from '../../types/project.type';
import { getProjectStats } from '../../utils/project.stats';
import { UsersStats } from './Users';
import { TotalStats } from './TotalStats';
import { TasksStats } from './Tasks';

type ProjectStatsProps = {
  projectTasks: TaskData[];
  projectsUsers: UserInProjectData[];
};

export const ProjectStats: React.FC<ProjectStatsProps> = ({
  projectTasks,
  projectsUsers,
}) => {
  const { projectTasksStats, projectUserStats } = getProjectStats(
    projectTasks,
    projectsUsers,
  );
  return (
    <Stack
      justifyContent={'space-evenly'}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={'stretch'}
      height={'100%'}
    >
      <Paper
        sx={{
          padding: 5,
          backgroundColor: themePalette.BG_2,
          width: '100%',
          alignContent: 'center',
        }}
        elevation={3}
      >
        <Typography
          display={'flex'}
          justifyContent={'center'}
          variant="h6"
          fontWeight={'bold'}
          alignItems={'center'}
          letterSpacing={'-0.03rem'}
        >
          <Task />
          TASKS STATS
        </Typography>

        <Divider sx={{ m: 1 }} />

        {projectTasks.length ? (
          <>
            <TasksStats
              totalTasks={projectTasksStats.totalTasks}
              totalComplete={projectTasksStats.totalComplete}
              totalPending={projectTasksStats.totalPending}
              totalInProgress={projectTasksStats.totalInProgress}
            />
            <Button sx={{ mt: 2 }} size="large" variant="contained" fullWidth>
              Tasks
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2 }} variant="subtitle1">
              The project doenst have any task
            </Typography>
            <Button
              onClick={() => handleSaveTaskModalOpen()}
              sx={{ mt: 2, fontWeight: 'bold' }}
              size="large"
              variant="contained"
              fullWidth
            >
              ADD TASK
            </Button>
          </>
        )}
      </Paper>

      <Paper
        sx={{ padding: 5, backgroundColor: themePalette.BG_2, width: '100%' }}
        elevation={3}
      >
        <TotalStats
          projectTasksData={projectTasksStats}
          projectUsersData={projectUserStats}
        />
      </Paper>

      <Paper
        sx={{ padding: 5, backgroundColor: themePalette.BG_2, width: '100%' }}
        elevation={3}
      >
        <UsersStats
          totalBasic={projectUserStats.totalBasic}
          totalMaintaner={projectUserStats.totalMaintaner}
          totalOwner={projectUserStats.totalOwner}
          totalUsers={projectUserStats.totalUsers}
        />
        <Button sx={{ mt: 2 }} size="large" variant="contained" fullWidth>
          Users
        </Button>
      </Paper>
    </Stack>
  );
};
