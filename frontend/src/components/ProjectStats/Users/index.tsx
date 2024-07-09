import React from 'react';
import {
  Person,
  Star,
  StarBorderOutlined,
  StarHalf,
} from '@mui/icons-material';
import { Divider, Stack, Typography } from '@mui/material';
import { Percentage } from '../../Percentage';
import { ProjectUserStats } from '../../../types/project.type';
import { calculatePercentage } from '../../../utils/project.stats';

export const UsersStats: React.FC<ProjectUserStats> = ({
  totalBasic,
  totalUsers,
  totalMaintaner,
  totalOwner,
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
        <Person />
        USERS STATS
      </Typography>
      <Divider sx={{ m: 1 }} />
      <Stack
        direction={'column'}
        justifyContent={'space-evenly'}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <>
          <Stack direction={'row'}>
            <Typography
              variant="subtitle1"
              fontWeight={'bold'}
              display={'flex'}
              alignItems={'center'}
              sx={{ mr: 'auto' }}
            >
              <StarBorderOutlined sx={{ mr: 1 }} />
              Basics:{' '}
            </Typography>
            <Percentage
              currentValue={calculatePercentage(totalBasic, totalUsers)}
            />
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              alignItems={'center'}
              sx={{ mr: 'auto' }}
            >
              <StarHalf sx={{ mr: 1 }} />
              Maintainers: {'  '}
            </Typography>
            <Percentage
              currentValue={calculatePercentage(totalMaintaner, totalUsers)}
            />
          </Stack>
          <Stack direction={'row'}>
            <Typography
              fontWeight={'bold'}
              display={'flex'}
              alignItems={'center'}
              sx={{ mr: 'auto' }}
            >
              <Star sx={{ mr: 1 }} /> Owners:{' '}
            </Typography>
            <Percentage
              currentValue={calculatePercentage(totalOwner, totalUsers)}
            />
          </Stack>
        </>
      </Stack>
    </>
  );
};
