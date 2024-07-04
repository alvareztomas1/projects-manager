import React, { SyntheticEvent } from 'react';
import { IUseAddUserToProject } from '../../interfaces/custom.hooks.interface';
import { UserData, UserToProject } from '../../types/user.type';
import { useAppSelector } from '../../redux/hooks';
import { users } from '../../api/users.api';
import { useFormik } from 'formik';
import { AddUserToProjectValidate } from '../../utils/validateForm';
import { ACCESS_LEVEL } from '../../constants/access-levels';
import { projects } from '../../api/projects.api';
import { useNotification } from '../../context/notification.context';
import { useNavigate } from 'react-router-dom';
import { AddUserToProjectData } from '../../types/project.type';

const useAddUserToProject = (projectId: string): IUseAddUserToProject => {
  const { getSuccess, getError } = useNotification();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const [addUserToProjectModalOpen, setAddUserToProjectModalOpen] =
    React.useState<boolean>(false);
  const [loadingAddUserButton, setLoadingAddUserButton] =
    React.useState<boolean>(false);
  const [searchResult, setSearchResult] = React.useState<UserData[]>([]);
  const handleAddUserToProjectModalOpen = () =>
    setAddUserToProjectModalOpen(true);
  const handleAddUserToProjectModalClose = () =>
    setAddUserToProjectModalOpen(false);

  const addUserToProjectFormik = useFormik<AddUserToProjectData>({
    initialValues: {
      user: {
        id: '',
        label: '',
        firstName: '',
        lastName: '',
      },
      accessLevel: ACCESS_LEVEL.BASIC,
    },
    validationSchema: AddUserToProjectValidate,
    onSubmit: async (values) => {
      setLoadingAddUserButton(true);
      try {
        const response = await projects.addUserToProject(
          projectId,
          { user: values.user.id, accessLevel: values.accessLevel },
          accessToken!,
        );

        getSuccess(`! ${response.user.username} added to project !`);
        navigate('/login');
      } catch (error) {
        setLoadingAddUserButton(false);
        getError((error as Error).message);
      }
    },
  });

  const handleSearchOnChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const valueToSearch = event.target.value;
    const valueToAsign: UserToProject = {
      id: '',
      label: valueToSearch,
      firstName: '',
      lastName: '',
    };
    addUserToProjectFormik.setFieldValue('user', valueToAsign);

    if (valueToSearch !== '') {
      try {
        const searchResponse = await users.findPartial(
          'username',
          valueToSearch,
          accessToken!,
        );
        setSearchResult(searchResponse);
      } catch (error) {
        setSearchResult([]);
      }
    }
  };
  const handleUserSelection = (
    event: SyntheticEvent<Element, Event>,
    selectedUser: UserToProject,
  ) => {
    addUserToProjectFormik.setFieldValue('user', selectedUser);
  };

  return {
    addUserToProjectModalOpen,
    handleAddUserToProjectModalOpen,
    handleAddUserToProjectModalClose,
    loadingAddUserButton,
    handleSearchOnChange,
    searchResult,
    handleUserSelection,
    addUserToProjectFormik,
  };
};

export default useAddUserToProject;
