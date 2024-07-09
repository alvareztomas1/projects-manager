import React from 'react';
import { IUseSaveProjectHook } from '../../interfaces/custom.hooks.interface';
import { CreateProjectType } from '../../types/project.type';
import { CreateProjectValidate } from '../../utils/validateForm';
import { useFormik } from 'formik';
import { useAppSelector } from '../../redux/hooks';
import { projects } from '../../api/projects.api';
import { useNotification } from '../../context/notification.context';
import { useNavigate } from 'react-router-dom';

const useSaveProject = (
  initialTitle: string = '',
  initialDescription: string = '',
  projectId: string | null = null,
): IUseSaveProjectHook => {
  const { userData, accessToken } = useAppSelector(
    (state) => state.authReducer,
  );
  const navigate = useNavigate();
  const { getError, getSuccess, getInfo } = useNotification();

  const [SaveProjectModalOpen, setSaveProjectModalOpen] = React.useState(false);
  const [loadingConfirmSaveButton, setLoadingConfirmSaveButton] =
    React.useState(false);

  const handleSaveProjectModalOpen = () => {
    setSaveProjectModalOpen(true);
  };
  const handleSaveProjectModalClose = () => {
    setSaveProjectModalOpen(false);
  };

  const formik = useFormik<CreateProjectType>({
    initialValues: {
      title: initialTitle,
      description: initialDescription,
    },
    validationSchema: CreateProjectValidate,
    onSubmit: async (values) => {
      setLoadingConfirmSaveButton(true);

      try {
        if (!projectId) {
          await projects.create(userData!.id, values, accessToken!);
          setLoadingConfirmSaveButton(true);
          getSuccess('! Project created successfully !');
        } else {
          await projects.edit(projectId, values, accessToken!);
          getInfo('! Project edited successfully !');
        }

        navigate('/login');
      } catch (error) {
        getError((error as Error).message);
        setLoadingConfirmSaveButton(false);
      }
    },
  });

  return {
    SaveProjectModalOpen,
    formik,
    handleSaveProjectModalOpen,
    handleSaveProjectModalClose,
    loadingConfirmSaveButton,
  };
};

export default useSaveProject;
