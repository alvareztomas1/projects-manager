import { Info } from '@mui/icons-material';
import { Fab } from '@mui/material';
import React from 'react';

type MoreInfoButtonProps = {
  projectId: string;
  size: 'small' | 'medium' | 'large';
};
export const MoreInfoButton: React.FC<MoreInfoButtonProps> = ({
  projectId,
  size,
}) => {
  return (
    <Fab
      size={size}
      color="info"
      href={`/project/${projectId}`}
      variant="extended"
    >
      <Info sx={{ mr: 1 }} />
      More info
    </Fab>
  );
};
