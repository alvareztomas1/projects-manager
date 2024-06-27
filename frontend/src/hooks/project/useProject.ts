import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProjectThunk } from '../../redux/thunks/getProject.thunk';
import { IUseProjectHook } from '../../interfaces/custom.hooks.interface';

const useProject = (): IUseProjectHook => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const { project, loading } = useAppSelector(
    (state) => state.getProjectReducer,
  );
  React.useEffect(() => {
    dispatch(
      getProjectThunk({
        projectId: projectId!,
        accessToken: accessToken!,
      }),
    );
  }, [dispatch, projectId, accessToken]);

  return { project, loading };
};
export default useProject;
