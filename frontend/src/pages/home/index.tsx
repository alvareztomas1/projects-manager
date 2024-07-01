import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { useSaveProject, useHomePage } from '../../hooks';
import { themePalette } from '../../config/theme.config';
import {
  ProjectFormModal,
  NoProjectsMessage,
  ProjectListElement,
} from '../../components';

export const HomePage: React.FC<{}> = () => {
  const { user, loading, projects, expanded, handleAccordionChange } =
    useHomePage();
  const {
    formik,
    SaveProjectModalOpen,
    handleSaveProjectModalClose,
    handleSaveProjectModalOpen,
    loadingConfirmSaveButton,
  } = useSaveProject();

  const renderProjectsList = projects?.map((userProject, index) => {
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
          {projects?.length ? (
            <>
              <Box sx={{ m: 1 }} display={'flex'} justifyContent={'center'}>
                <Button
                  sx={{ letterSpacing: '-0.02rem', fontWeight: 'bold' }}
                  variant="contained"
                  onClick={handleSaveProjectModalOpen}
                  size="large"
                >
                  {'CREATE A NEW PROJECT'}
                </Button>
                <ProjectFormModal
                  formik={formik}
                  msg={'CREATE A NEW PROJECT'}
                  loadingButton={loadingConfirmSaveButton}
                  open={SaveProjectModalOpen}
                  handleClose={() => handleSaveProjectModalClose()}
                />
              </Box>
              <Typography variant="subtitle1">
                Here is a list of your current projects
              </Typography>
              {renderProjectsList}
            </>
          ) : (
            <NoProjectsMessage
              loading={loadingConfirmSaveButton}
              open={SaveProjectModalOpen}
              formik={formik}
              userRole={user!.role}
              handleSaveProjectModalOpen={handleSaveProjectModalOpen}
              handleSaveProjectModalClose={handleSaveProjectModalClose}
            />
          )}
        </>
      )}
    </Container>
  );
};
