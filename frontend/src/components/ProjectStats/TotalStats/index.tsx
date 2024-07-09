import React from 'react';
import { Folder } from '@mui/icons-material';
import { Divider, Stack, Typography } from '@mui/material';
import {
  ProjectTasksStats,
  ProjectUserStats,
} from '../../../types/project.type';

type TotalStatsProps = {
  projectUsersData: ProjectUserStats;
  projectTasksData: ProjectTasksStats;
};

export const TotalStats: React.FC<TotalStatsProps> = ({
  projectUsersData,
  projectTasksData,
}) => {
  return (
    <>
      <Typography
        display={'flex'}
        justifyContent={'center'}
        variant="h6"
        fontWeight={'bold'}
        alignItems={'center'}
        letterSpacing={'-0.03rem'}
      >
        <Folder />
        PROJECT STATS
      </Typography>
      <Divider sx={{ m: 1 }} />
      <Stack
        direction={'column'}
        justifyContent={'space-evenly'}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={1}
      >
        <>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Total Users:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectUsersData.totalUsers}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Basics:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectUsersData.totalBasic}{' '}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Maintaners:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectUsersData.totalMaintaner}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Owners:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectUsersData.totalOwner}
            </Typography>
          </Stack>
        </>

        <>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Total Tasks:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectTasksData.totalTasks}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Pending:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectTasksData.totalPending}{' '}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              In progress:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectTasksData.totalInProgress}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              variant="subtitle1"
              sx={{ mr: 'auto' }}
            >
              Complete:
            </Typography>
            <Typography fontWeight={'bold'} variant="subtitle1">
              {projectTasksData.totalComplete}
            </Typography>
          </Stack>
        </>
      </Stack>
    </>
  );
};
