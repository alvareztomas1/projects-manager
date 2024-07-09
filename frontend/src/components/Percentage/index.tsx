import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

type PercentageProps = {
  currentValue: number;
};

export const Percentage: React.FC<PercentageProps> = ({ currentValue }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        size={'3.25rem'}
        variant="determinate"
        value={currentValue}
        sx={{ m: 1 }}
      />{' '}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" component="div" color="text.secondary">
          {currentValue}%
        </Typography>
      </Box>
    </Box>
  );
};
