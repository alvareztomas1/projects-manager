import { Box, Button } from '@mui/material';
import React from 'react';
import { ProjectFormModal } from '../ProjectFormModal';
import { useSaveProject } from '../../hooks';

export const CreateNewProject: React.FC<{}> = () => {
  const {
    formik,
    SaveProjectModalOpen,
    handleSaveProjectModalClose,
    handleSaveProjectModalOpen,
    loadingConfirmSaveButton,
  } = useSaveProject();

  return (
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
    </>
  );
};
