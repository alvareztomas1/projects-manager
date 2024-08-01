import React from 'react';
import { tasks } from '../../api/tasks.api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTasksThunk } from '../../redux/thunks/getTasks.thunk';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../context/notification.context';

interface IUseDeleteTask {
  taskToDeleteId: string;
  deleteModalOpen: boolean;
  loadingConfirmDeleteButton: boolean;
  handleDeleteModalClose: () => void;
  handleDeleteModalOpen: (id: string) => void;
  handleDelete: (id: string) => Promise<void>;
}

const useDeleteTask = (): IUseDeleteTask => {
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const { getSuccess, getError } = useNotification();
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [taskToDeleteId, setTaskToDeleteId] = React.useState<string>('');
  const [loadingConfirmDeleteButton, setLoadingConfirmDeleteButton] =
    React.useState<boolean>(false);

  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalOpen(true);
    setTaskToDeleteId(id);
  };

  const handleDelete = async (id: string) => {
    setLoadingConfirmDeleteButton(true);

    try {
      await tasks.delete(taskToDeleteId, accessToken!);
      handleDeleteModalClose();
      await dispatch(
        getTasksThunk({
          accessToken: accessToken!,
          projectId: projectId!,
        }),
      );
      getSuccess('Task deleted');
    } catch (error) {
      getError((error as Error).message);
    }

    setLoadingConfirmDeleteButton(false);
  };

  return {
    taskToDeleteId,
    deleteModalOpen,
    loadingConfirmDeleteButton,
    handleDeleteModalClose,
    handleDeleteModalOpen,
    handleDelete,
  };
};

export default useDeleteTask;
