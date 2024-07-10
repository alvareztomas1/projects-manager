import React from 'react';
import { useFormik } from 'formik';
import { STATUS } from '../../constants/status';
import { IUseSaveTask } from '../../interfaces/custom.hooks.interface';
import { AddTask } from '../../types/task.type';

export const useSaveTask = (
  initialTitle: string = '',
  initialDescription: string = '',
  taskId: string | null = null,
): IUseSaveTask => {
  const [saveTaskModalOpen, setSaveTaskModalOpen] = React.useState(false);
  const [loadingSaveTaskButton, setLoadingSaveTaskButton] =
    React.useState(false);

  const handleSaveTaskModalOpen = () => {
    setSaveTaskModalOpen(true);
  };
  const handleSaveTaskModalClose = () => {
    setSaveTaskModalOpen(false);
  };

  const addTaskFormik = useFormik<AddTask>({
    initialValues: {
      title: initialTitle,
      description: initialDescription,
      status: STATUS.PENDING,
    },
    onSubmit: async (values) => {
  });

  return {
    saveTaskModalOpen,
    handleSaveTaskModalOpen,
    handleSaveTaskModalClose,
    loadingSaveTaskButton,
    addTaskFormik,
  };
};
