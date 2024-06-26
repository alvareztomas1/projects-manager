import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserThunk } from '../redux/thunks/getUser.thunk';
import { useNotification } from '../context/notification.context';
import { IUseHomeHook } from '../interfaces/custom.hooks.interface';

const useHomePage = (): IUseHomeHook => {
  const { userData, accessToken } = useAppSelector(
    (state) => state.authReducer,
  );
  const { user, loading } = useAppSelector((state) => state.getUserReducer);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { getError } = useNotification();

  React.useEffect(() => {
    const getUserData = async () => {
      const response = await dispatch(
        getUserThunk({
          userId: userData!.id,
          accessToken: accessToken!,
        }),
      );

      if (response.meta.requestStatus === 'rejected') {
        getError(response.payload);
      }
    };

    getUserData();
  }, [dispatch, accessToken, userData, getError]);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const projects = user!.projectsIncluded;

  return { user, projects, loading, expanded, handleAccordionChange };
};

export default useHomePage;
