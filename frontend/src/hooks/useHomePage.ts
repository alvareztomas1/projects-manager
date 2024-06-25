import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserThunk } from '../redux/thunks/getUser.thunk';

const useHomePage = () => {
  const { userData, accessToken } = useAppSelector(
    (state) => state.authReducer,
  );
  const { user, loading } = useAppSelector((state) => state.getUserReducer);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  React.useEffect(() => {
    dispatch(
      getUserThunk({
        userId: userData!.id,
        accessToken: accessToken!,
      }),
    );
  }, [dispatch, accessToken, userData]);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const projects = user?.projectsIncluded;

  return { user, projects, loading, expanded, handleAccordionChange };
};

export default useHomePage;
