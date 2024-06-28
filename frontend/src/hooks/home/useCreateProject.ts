import React from 'react';
import { IUseCreateProjectHook } from '../../interfaces/custom.hooks.interface';
import { CreateProjectType } from '../../types/project.type';
import { CreateProjectValidate } from '../../utils/validateForm';
import { useFormik } from 'formik';
import { useAppSelector } from '../../redux/hooks';
import { projects } from '../../api/projects.api';
import { useNotification } from '../../context/notification.context';
import { useNavigate } from 'react-router-dom';

const useCreateProject = (): IUseCreateProjectHook => {
  const { userData, accessToken } = useAppSelector(
    (state) => state.authReducer,
  );
  const navigate = useNavigate();
  const { getError, getSuccess } = useNotification();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik<CreateProjectType>({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: CreateProjectValidate,
    onSubmit: async (values) => {
      try {
        await projects.create(userData!.id, values, accessToken!);

        setLoading(true);
        getSuccess('!Project created successfully!');
        handleClose();
        navigate('/login');
      } catch (error) {
        getError((error as Error).message);
      }
    },
  });

  return { open, formik, handleOpen, handleClose, loading };
};

export default useCreateProject;
