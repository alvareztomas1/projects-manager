import React from 'react';
import { IUseCreateProjectHook } from '../../interfaces/custom.hooks.interface';
import { CreateProjectType } from '../../types/project.type';
import { CreateProjectValidate } from '../../utils/validateForm';
import { useFormik } from 'formik';

const useCreateProject = (): IUseCreateProjectHook => {
  const [open, setOpen] = React.useState(false);
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
      // TODO: Create a new project
    },
  });

  return { open, formik, handleOpen, handleClose };
};

export default useCreateProject;
