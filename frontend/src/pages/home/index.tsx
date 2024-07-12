import React from 'react';
import { Container, Divider, Paper } from '@mui/material';
import { useHomePage } from '../../hooks';
import { themePalette } from '../../config/theme.config';
import {
  NoProjectsMessage,
  CreateNewProject,
  ProjectsList,
  WelcomeMessage,
} from '../../components';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ROLES } from '../../constants/roles';

export const HomePage: React.FC<{}> = () => {
  const { user, loading } = useHomePage();
  const userHasBasicRole = user?.role === ROLES.BASIC;

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
        <LoadingSpinner />
      ) : (
        <>
          <WelcomeMessage
            firstName={user!.firstName}
            lastName={user!.lastName}
          />

          <Divider sx={{ m: 2 }} />

          {!userHasBasicRole && <CreateNewProject />}

          {user?.projectsIncluded.length ? (
            <ProjectsList projects={user.projectsIncluded} />
          ) : (
            <Paper
              sx={{
                backgroundColor: themePalette.BG_2,
                padding: 3,
                borderRadius: '10px',
              }}
              elevation={24}
            >
              <NoProjectsMessage userRole={user!.role} />
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};
