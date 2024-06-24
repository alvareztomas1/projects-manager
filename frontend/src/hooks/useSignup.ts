import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/notification.context';
import { useFormik } from 'formik';
import { SignUpValidate } from '../utils/validateForm';
import { users } from '../api/users.api';
import { SignUpDataType } from '../types/signup.type';
import { IUseSignupHook } from '../interfaces/custom.hooks.interface';

function useSingup(): IUseSignupHook {
  const navigate = useNavigate();
  const { getError } = useNotification();

  const formik = useFormik<SignUpDataType>({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpValidate,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...userData } = values;
        const response = await users.create(userData);

        navigate(`/signup-success/${response.username}`);
      } catch (error) {
        getError((error as Error).message);
      }
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return { handleClickShowPassword, showPassword, formik };
}

export default useSingup;
