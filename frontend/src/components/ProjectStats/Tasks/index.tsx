import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import {
  CheckCircle,
  Pending,
  RemoveCircleRounded,
  Task,
} from '@mui/icons-material';
import { Percentage } from '../../Percentage';
import { ProjectTasksStats } from '../../../types/project.type';
import { calculatePercentage } from '../../../utils/project.stats';

export const TasksStats: React.FC<ProjectTasksStats> = ({
  totalTasks,
  totalPending,
  totalInProgress,
  totalComplete,
}) => {
  return (
    <Stack
      direction={'column'}
      justifyContent={'space-evenly'}
      divider={<Divider orientation="horizontal" flexItem />}
      alignContent={'center'}
      spacing={2}
    >
      {totalTasks && (
        <>
          <Stack direction="row">
            <Typography
              variant="subtitle1"
              fontWeight={'bold'}
              display={'flex'}
              alignItems={'center'}
              sx={{ mr: 'auto' }}
            >
              <RemoveCircleRounded sx={{ mr: 1 }} />
              Pending:{' '}
            </Typography>
            <Percentage
              currentValue={calculatePercentage(totalPending, totalTasks)}
            />
          </Stack>

          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              alignItems={'center'}
              sx={{ mr: 'auto' }}
            >
              <Pending sx={{ mr: 1 }} />
              In progress: {'  '}
            </Typography>
            <Percentage
              currentValue={calculatePercentage(totalInProgress, totalTasks)}
            />
          </Stack>

          <Stack direction="row">
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              alignItems={'center'}
              sx={{ mr: 'auto' }}
            >
              <CheckCircle sx={{ mr: 1 }} /> Completed:{' '}
            </Typography>
            <Percentage
              currentValue={calculatePercentage(totalComplete, totalTasks)}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};
