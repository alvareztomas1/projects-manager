import { Chip, Typography } from '@mui/material';
import { ROLES } from '../../constants/roles';

type NoProjectMessageProps = {
  userRole: ROLES;
};

export const NoProjectsMessage: React.FC<NoProjectMessageProps> = ({
  userRole,
}) => {
  return (
    <>
      <Typography
        sx={{ display: 'flex', justifyContent: 'center' }}
        mb={1}
        variant="h5"
      >
        You dont belong to any project!
      </Typography>
      <Typography>
        Currently, you have{' '}
        <Chip
          variant="outlined"
          label={userRole}
          color={userRole === ROLES.BASIC ? 'secondary' : 'success'}
        />{' '}
        role,{' '}
        {userRole === ROLES.BASIC
          ? 'which does not allow you to create projects. Please wait until someone incorporates you into one, or until an admin brings you a higher role.'
          : 'that allows you to create projects.'}
      </Typography>
    </>
  );
};
