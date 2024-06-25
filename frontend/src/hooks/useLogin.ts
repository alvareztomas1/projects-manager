import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { useFormik } from 'formik';
import { LoginValidate } from '../utils/validateForm';
import { authThunk } from '../redux/thunks/auth.thunk';
import { LoginType } from '../types/login.type';
import { IUseLoginHook } from '../interfaces/custom.hooks.interface';
import { useNotification } from '../context/notification.context';

function useLogin(): IUseLoginHook {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const { getError } = useNotification();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSignUpButton = () => navigate('/signup');

  const formik = useFormik<LoginType>({
    initialValues: {
      userIdentifier: localStorage.getItem('remember') || '',
      password: '',
      remember: false,
    },
    validationSchema: LoginValidate,
    onSubmit: async (values) => {
      const { remember, ...userData } = values;
      const loginState = await dispatch(authThunk(userData));

      if (loginState.meta.requestStatus === 'fulfilled') {
        if (remember) {
          localStorage.setItem('remember', userData.userIdentifier);
        } else {
          localStorage.removeItem('remember');
        }
        navigate('/');
      } else {
        localStorage.removeItem('remember');
        getError(JSON.stringify(loginState.payload));
      }
    },
  });

  return { formik, handleClickShowPassword, showPassword, handleSignUpButton };
}

export default useLogin;
