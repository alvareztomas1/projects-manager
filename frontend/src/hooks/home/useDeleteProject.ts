import React from 'react';
import { projects } from '../../api/projects.api';
import { useAppSelector } from '../../redux/hooks';
import { useNotification } from '../../context/notification.context';
import { useNavigate } from 'react-router-dom';

const useDeleteProject = () => {
  const [loading, setLoading] = React.useState(false);
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const { getSuccess, getError } = useNotification();
  const navigate = useNavigate();

  const handleConfirmDelete = async (id: string) => {
    try {
      await projects.delete(id, accessToken!);

      setLoading(true);
      getSuccess('Project deleted!');
      navigate('/login');
    } catch (error) {
      getError((error as Error).message);
    }
  };

  return { loading, handleConfirmDelete };
};

export default useDeleteProject;
