import React from 'react';
import { projects } from '../../api/projects.api';
import { useAppSelector } from '../../redux/hooks';
import { useNotification } from '../../context/notification.context';
import { useNavigate } from 'react-router-dom';
import { IUseDeleteProjectHook } from '../../interfaces/custom.hooks.interface';

const useDeleteProject = (): IUseDeleteProjectHook => {
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const { getSuccess, getError } = useNotification();
  const navigate = useNavigate();
  const [loadingConfirmDeleteButton, setLoadingConfirmDeleteButton] =
    React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = async (id: string) => {
    setLoadingConfirmDeleteButton(true);

    try {
      await projects.delete(id, accessToken!);
      getSuccess('Project deleted!');
      navigate('/login');
    } catch (error) {
      getError((error as Error).message);
    }
  };

  return {
    openDeleteModal,
    loadingConfirmDeleteButton,
    handleConfirmDelete,
    handleDeleteModalOpen,
    handleDeleteModalClose,
  };
};

export default useDeleteProject;
