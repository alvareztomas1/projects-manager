import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { ACCESS_LEVEL } from '../../../constants/access-levels';

type ProjectTitleProps = {
  title: string;
  accessLevel: ACCESS_LEVEL;
};

export const ProjectTitle: React.FC<ProjectTitleProps> = ({
  title,
  accessLevel,
}) => {
  return (
    <Box display={'flex'} sx={{ alignItems: 'center' }}>
      <Typography sx={{ wordBreak: 'break-word' }} m={1} variant="h5">
        {title.split('')[0].toUpperCase() + title.slice(1)}
      </Typography>
      <Chip
        size="small"
        variant="outlined"
        label={ACCESS_LEVEL[accessLevel]}
        color={+accessLevel === ACCESS_LEVEL.OWNER ? 'success' : 'secondary'}
      />
    </Box>
  );
};
