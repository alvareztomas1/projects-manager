import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { useFormik } from 'formik';
import { LoginValidate } from '../utils/validateForm';
import { authThunk } from '../redux/thunks/auth.thunk';
import { LoginType } from '../types/login.type';

function useLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();

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
      } else {
        localStorage.removeItem('remember');
      }

      navigate('/');
    },
  });

  return { formik, handleClickShowPassword, showPassword, handleSignUpButton };
}

export default useLogin;
