import React from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useHomePage } from '../../hooks';
import { ROLES } from '../../constants/roles';
import { themePalette } from '../../config/theme.config';
import { ProjectListElement } from '../../components';

export const HomePage: React.FC<{}> = () => {
  const { user, loading, projects, expanded, handleAccordionChange } =
    useHomePage();
  const projectsList = projects.map((userProject, index) => {
    return (
      <div key={`project-${userProject.id}`}>
        <ProjectListElement
          accessLevel={userProject.accessLevel}
          handleAccordionChange={handleAccordionChange}
          expanded={expanded}
          id={userProject.project.id}
          title={userProject.project.title}
          description={userProject.project.description}
        />
      </div>
    );
  });

  return (
    <Container
      sx={{
        p: 5,
        mt: 5,
        backgroundColor: themePalette.BG_2,
        borderRadius: '5px',
      }}
      maxWidth="md"
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            sx={{ display: 'flex', justifyContent: 'center' }}
            variant="h2"
          >
            Welcome!{' '}
            {user!.firstName.charAt(0).toUpperCase() + user!.firstName.slice(1)}{' '}
            {user!.lastName.charAt(0).toUpperCase() + user!.lastName.slice(1)}
          </Typography>
          <Divider sx={{ m: 2 }} />
          {projects.length ? (
            <>
              <Typography variant="h4">
                Here is a list of your current projects
              </Typography>
              {projectsList}
            </>
          ) : (
            <>
              <Paper
                sx={{
                  backgroundColor: themePalette.BG_2,
                  padding: 3,
                  borderRadius: '10px',
                }}
                elevation={24}
              >
                <Typography
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  mb={1}
                  variant="h5"
                >
                  You dont belong to any project!
                </Typography>
                {user!.role === ROLES.BASIC ? (
                  <Typography variant="h6">
                    Currently you have a{'  '}
                    <Chip
                      variant="outlined"
                      label={'BASIC'}
                      color={'secondary'}
                    />
                    {'  '}
                    role, meaning that you cant create projects! Please wait
                    until someone incorpores you
                  </Typography>
                ) : (
                  <Typography variant="h5">Create a project</Typography>
                )}
              </Paper>
            </>
          )}
        </>
      )}
    </Container>
  );
};
