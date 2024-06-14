import {
  Alert,
  AlertColor,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material';

type NotificationProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  handleClose: () => void;
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  severity,
  handleClose,
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert variant="outlined" onClose={handleClose} severity={severity}>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};
