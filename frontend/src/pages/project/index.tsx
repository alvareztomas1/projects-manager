import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { useProject } from '../../hooks';
import { themePalette } from '../../config/theme.config';
import { ProjectStats } from '../../components';

export const ProjectPage: React.FC<{}> = () => {
  const { loading, project } = useProject();

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Container
      sx={{
        p: 5,
        mt: 5,
        backgroundColor: themePalette.BG_2,
        borderRadius: '5px',
      }}
      maxWidth="md"
    >
      {' '}
      <Typography
        sx={{ display: 'flex', justifyContent: 'center' }}
        variant="h2"
      >
        {project?.title.split('')[0].toUpperCase()}
        {project?.title.slice(1)}
      </Typography>
      <Divider sx={{ m: 1 }} />
      <Typography sx={{ m: 3, wordWrap: 'break-word' }} variant="h4">
        {project?.description.split('')[0].toUpperCase()}
        {project?.description.slice(1)}
      </Typography>
      <ProjectStats
        projectTasks={project!.tasks}
        projectsUsers={project!.usersIncluded}
      />
    </Container>
  );
};
