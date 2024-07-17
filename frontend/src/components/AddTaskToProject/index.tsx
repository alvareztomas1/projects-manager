import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SaveTaskModal } from '../SaveTaskModal';
import { useSaveTask } from '../../hooks';

export const AddTaskToProject: React.FC<{}> = () => {
  const {
    saveTaskModalOpen,
    handleSaveTaskModalClose,
    handleSaveTaskModalOpen,
    loadingSaveTaskButton,
    saveTaskFormik,
  } = useSaveTask();
  return (
    <Box mb={4} display={'flex'} justifyContent={'space-between'}>
      <Typography fontWeight={'bold'} variant="h5">
        TASKS LIST
      </Typography>

      <Button
        onClick={() => handleSaveTaskModalOpen()}
        sx={{ fontWeight: 'bold' }}
        variant="contained"
        size="medium"
      >
        ADD TASK
      </Button>

      <SaveTaskModal
        msg={'ADD TASK TO PROJECT'}
        openModal={saveTaskModalOpen}
        handleClose={() => handleSaveTaskModalClose()}
        loadingSaveTaskButton={loadingSaveTaskButton}
        formik={saveTaskFormik}
      />
    </Box>
  );
};
