import { useFormik } from 'formik';
import { LoginType } from '../types/login.type';
import { SignUpDataType } from '../types/signup.type';
import { UserData, UserProjectData } from '../types/user.type';

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

export interface IUseHomeHook {
  user: UserData | null;
  projects: UserProjectData[] | undefined;
  loading: boolean;
  expanded: string | false;
  handleAccordionChange: (
    panel: string,
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export interface IUseCreateProjectHook {
  open: boolean;
  loading: boolean;
  formik: ReturnType<typeof useFormik<CreateProjectType>>;
  handleOpen: () => void;
  handleClose: () => void;
}
