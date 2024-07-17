import { Button } from '@mui/material';
import React from 'react';
import { SaveTaskModal } from '../SaveTaskModal';
import { STATUS } from '../../constants/status';
import { useSaveTask } from '../../hooks';

type EditTaskProps = {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: STATUS;
};

export const EditTask: React.FC<EditTaskProps> = ({
  taskId,
  taskTitle,
  taskDescription,
  taskStatus,
}) => {
  const {
    saveTaskModalOpen,
    handleSaveTaskModalClose,
    handleSaveTaskModalOpen,
    loadingSaveTaskButton,
    saveTaskFormik,
  } = useSaveTask(taskId, taskTitle, taskDescription, taskStatus);
  return (
    <>
      <Button onClick={() => handleSaveTaskModalOpen()} color="info">
        EDIT
      </Button>
      <SaveTaskModal
        msg={'EDIT TASK'}
        handleClose={() => handleSaveTaskModalClose()}
        openModal={saveTaskModalOpen}
        loadingSaveTaskButton={loadingSaveTaskButton}
        formik={saveTaskFormik}
      />
    </>
  );
};
