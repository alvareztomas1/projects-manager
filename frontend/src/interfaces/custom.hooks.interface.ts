import { useFormik } from 'formik';
import { LoginType } from '../types/login.type';
import { SignUpDataType } from '../types/signup.type';

export interface IUseLoginHook {
  formik: ReturnType<typeof useFormik<LoginType>>;
  handleClickShowPassword: () => void;
  showPassword: boolean;
  handleSignUpButton: () => void;
}

export interface IUseSignupHook {
  handleClickShowPassword: () => void;
  showPassword: boolean;
  formik: ReturnType<typeof useFormik<SignUpDataType>>;
}

export interface IUseNavBarHook {
  handleLogout: () => void;
}
