import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSaveTask } from '../../../hooks';
import { SaveTaskModal } from '../../SaveTaskModal';

export const AddTask: React.FC<{}> = () => {
  const {
    saveTaskModalOpen,
    handleSaveTaskModalClose,
    handleSaveTaskModalOpen,
    loadingSaveTaskButton,
    saveTaskFormik,
  } = useSaveTask();
  return (
    <>
      <Typography sx={{ mt: 2 }} variant="subtitle1">
        The project doenst have any task
      </Typography>
      <Button
        onClick={() => handleSaveTaskModalOpen()}
        sx={{ mt: 2, fontWeight: 'bold' }}
        size="large"
        variant="contained"
        fullWidth
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
    </>
  );
};
