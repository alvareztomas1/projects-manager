import React from 'react';
import { SaveTaskModal } from '../SaveTaskModal';
import { STATUS } from '../../constants/status';
import { usePopOvers, useSaveTask } from '../../hooks';
import { EditButton } from '../EditButton';

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
  const { anchorEdit, openEditPopover, handlePopoverOpen, handlePopoverClose } =
    usePopOvers();
  return (
    <>
      <EditButton
        msg={'Edit task'}
        size="small"
        handleSaveProjectModalOpen={handleSaveTaskModalOpen}
        anchorEdit={anchorEdit}
        openEditPopover={openEditPopover}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose}
      />
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
