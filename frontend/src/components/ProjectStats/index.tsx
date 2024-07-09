import React from 'react';
import { Button, Paper, Stack } from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { TaskData } from '../../types/task.type';
import { UserInProjectData } from '../../types/project.type';

type ProjectStatsProps = {
  projectTasks: TaskData[];
  projectsUsers: UserInProjectData[];
};

export const ProjectStats: React.FC<ProjectStatsProps> = ({
  projectTasks,
  projectsUsers,
}) => {
  );
  return (
    <Stack
      justifyContent={'space-evenly'}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={'stretch'}
      height={'100%'}
    >
    </Stack>
  );
};
