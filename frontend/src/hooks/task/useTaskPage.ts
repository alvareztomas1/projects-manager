import React from 'react';
import { getTasksThunk } from '../../redux/thunks/getTasks.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { getUserThunk } from '../../redux/thunks/getUser.thunk';
import { ACCESS_LEVEL } from '../../constants/access-levels';
import { getProjectThunk } from '../../redux/thunks/getProject.thunk';
import { TaskData } from '../../types/task.type';

interface IUseTaskPage {
  projectId: string | undefined;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  accessLevel: ACCESS_LEVEL | undefined;
  tasks: TaskData[];
}

const useTaskPage = (): IUseTaskPage => {
  const { projectId } = useParams();
  const { accessToken, userData } = useAppSelector(
    (state) => state.authReducer,
  );
  const { user } = useAppSelector((state) => state.getUserReducer);
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(
    (state) => state.getTasksReducer,
  );

  React.useEffect(() => {
    const getTasks = async () => {
      await dispatch(
        getTasksThunk({
          projectId: projectId!,
          accessToken: accessToken!,
        }),
      );
    };
    const getUser = async () => {
      await dispatch(
        getUserThunk({
          userId: userData!.id,
          accessToken: accessToken!,
        }),
      );
    };
    getTasks();
    getUser();
  }, [dispatch]);

  const userInProject = user?.projectsIncluded.find(
    (userProject) => userProject.project.id === projectId,
  );

  return {
    tasks,
    projectId,
    error,
    loading,
    accessLevel: userInProject?.accessLevel,
  };
};

export default useTaskPage;
