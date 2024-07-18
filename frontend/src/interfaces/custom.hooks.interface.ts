import { useFormik } from 'formik';
import { LoginType } from '../types/login.type';
import { SignUpDataType } from '../types/signup.type';
import { UserData, UserToProject } from '../types/user.type';
import {
  AddUserToProjectData,
  CreateProjectType,
  ProjectData,
} from '../types/project.type';
import { SyntheticEvent } from 'react';
import { AddTask } from '../types/task.type';

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
  loading: boolean;
}

export interface IUseSaveProjectHook {
  SaveProjectModalOpen: boolean;
  loadingConfirmSaveButton: boolean;
  formik: ReturnType<typeof useFormik<CreateProjectType>>;
  handleSaveProjectModalOpen: () => void;
  handleSaveProjectModalClose: () => void;
}

export interface IUseSaveTask {
  saveTaskModalOpen: boolean;
  loadingSaveTaskButton: boolean;
  saveTaskFormik: ReturnType<typeof useFormik<AddTask>>;
  handleSaveTaskModalOpen: () => void;
  handleSaveTaskModalClose: () => void;
}

export interface IUseProjectHook {
  project: ProjectData | null;
  loading: boolean;
}

export interface IUseDeleteProjectHook {
  openDeleteModal: boolean;
  handleDeleteModalOpen: () => void;
  handleDeleteModalClose: () => void;
  loadingConfirmDeleteButton: boolean;
  handleConfirmDelete: (id: string) => Promise<void>;
}

export interface IUsePopOversHook {
  anchorAdd: HTMLElement | null;
  anchorEdit: HTMLElement | null;
  anchorDelete: HTMLElement | null;
  openAddPopover: boolean;
  openEditPopover: boolean;
  openDeletePopover: boolean;
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    type: 'add' | 'edit' | 'delete',
  ) => void;
  handlePopoverClose: (type: 'add' | 'edit' | 'delete') => void;
}

export interface IUseAddUserToProject {
  addUserToProjectModalOpen: boolean;
  handleAddUserToProjectModalClose: () => void;
  handleAddUserToProjectModalOpen: () => void;
  loadingAddUserButton: boolean;
  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: UserData[];
  addUserToProjectFormik: ReturnType<typeof useFormik<AddUserToProjectData>>;
  handleUserSelection: (
    event: SyntheticEvent<Element, Event>,
    selectedUser: UserToProject,
  ) => void;
}
