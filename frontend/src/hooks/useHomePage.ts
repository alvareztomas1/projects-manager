import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserThunk } from '../redux/thunks/getUser.thunk';

const useHomePage = () => {
  const { userData, accessToken } = useAppSelector(
    (state) => state.authReducer,
  );
  const { user, loading } = useAppSelector((state) => state.getUserReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      getUserThunk({
        userId: userData!.id,
        accessToken: accessToken!,
      }),
    );
  }, [dispatch, accessToken, userData]);

  const projects = user?.projectsIncluded;
  return { user, projects, loading };
};

export default useHomePage;
