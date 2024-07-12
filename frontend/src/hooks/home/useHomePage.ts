import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserThunk } from '../../redux/thunks/getUser.thunk';
import { useNotification } from '../../context/notification.context';
import { IUseHomeHook } from '../../interfaces/custom.hooks.interface';

const useHomePage = (): IUseHomeHook => {
  const { userData, accessToken } = useAppSelector(
    (state) => state.authReducer,
  );
  const { user, loading } = useAppSelector((state) => state.getUserReducer);
  const dispatch = useAppDispatch();
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
  }, []);

  return { user, loading };
};

export default useHomePage;
