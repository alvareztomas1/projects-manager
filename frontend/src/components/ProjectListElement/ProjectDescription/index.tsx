import { Typography } from '@mui/material';
import React from 'react';

type ProjectDescriptionPros = {
  description: string;
};

export const ProjectDescription: React.FC<ProjectDescriptionPros> = ({
  description,
}) => {
  return (
    <Typography sx={{ wordBreak: 'break-word' }} variant="h6">
      {description.split('')[0].toUpperCase() + description.slice(1)}
    </Typography>
  );
};
