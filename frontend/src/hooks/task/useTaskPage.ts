import React from 'react';
import { getTasksThunk } from '../../redux/thunks/getTasks.thunk';
import { GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../constants/status';
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { ROLES } from '../../constants/roles';

interface IUseTaskPage {
  tableColumns: GridColDef[];
  tableRows: {
    id: string;
    number: number;
    title: string;
    description: string;
    status: STATUS;
    usersIncluded: string | string[];
  }[];
  projectId: string | undefined;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  role: ROLES;
}

export const useTaskPage = (): IUseTaskPage => {
  const { projectId } = useParams();
  const { user } = useAppSelector((state) => state.getUserReducer);
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(
    (state) => state.getTasksReducer,
  );
  const tableColumns: GridColDef[] = [
    {
      field: 'id',
      hideable: false,
    },
    { field: 'number', headerName: 'N°', width: 100, headerAlign: 'center' },

    { field: 'title', headerName: 'Title', width: 300, headerAlign: 'center' },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      headerAlign: 'center',
    },
  ];
  const tableRows = tasks?.map((task, index) => ({
    id: task.id,
    number: index + 1,
    title: task.title,
    description: task.description,
    status: task.status,
    usersIncluded: task.usersIncluded.length
      ? task.usersIncluded.map((user) => user.username)
      : '-',
  }));

  React.useEffect(() => {
    const getTasks = async () => {
      dispatch(
        getTasksThunk({
          projectId: projectId!,
          accessToken: accessToken!,
        }),
      );
    };
    getTasks();
  }, [dispatch]);

  return {
    tableColumns,
    tableRows,
    projectId,
    error,
    loading,
    role: user!.role,
  };
};
