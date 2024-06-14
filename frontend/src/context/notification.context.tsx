import React from 'react';
import { Notification } from '../components';
import { AlertColor } from '@mui/material';

type ContextProps = {
  getError: (msg: string) => void;
  getSuccess: (msg: string) => void;
  getWarning: (msg: string) => void;
  getInfo: (msg: string) => void;
};

const NotificationContext = React.createContext<ContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [severity, setSeverity] = React.useState<AlertColor | undefined>(
    undefined,
  );

  const getError = (msg: string) => {
    setSeverity('error');
    setOpen(true);
    setMessage(msg);
  };

  const getSuccess = (msg: string) => {
    setSeverity('success');
    setOpen(true);
    setMessage(msg);
  };

  const getWarning = (msg: string) => {
    setSeverity('warning');
    setOpen(true);
    setMessage(msg);
  };

  const getInfo = (msg: string) => {
    setSeverity('info');
    setOpen(true);
    setMessage(msg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const value = { getError, getSuccess, getWarning, getInfo };

  return (
    <NotificationContext.Provider value={value}>
      <Notification
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);

  if (!context) throw new Error('There is no context');

  return context;
};
