import { Box, Chip, Paper, Typography } from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { ROLES } from '../../constants/roles';
import { ProjectFormModal } from '../ProjectFormModal';
import { useCreateProject } from '../../hooks';

type NoProjectMessageProps = {
  userRole: ROLES;
};

export const NoProjectsMessage: React.FC<NoProjectMessageProps> = ({
  userRole,
}) => {
  const { formik, open, handleClose, handleOpen, loadingButton } =
    useCreateProject();

  return (
    <>
      <Paper
        sx={{
          backgroundColor: themePalette.BG_2,
          padding: 3,
          borderRadius: '10px',
        }}
        elevation={24}
      >
        <Typography
          sx={{ display: 'flex', justifyContent: 'center' }}
          mb={1}
          variant="h5"
        >
          You dont belong to any project!
        </Typography>
        {userRole === ROLES.BASIC ? (
          <Typography variant="body1">
            Currently, you have a{' '}
            <Chip variant="outlined" label={'BASIC'} color={'secondary'} />{' '}
            role, which does not allow you to create projects. Please wait until
            someone incorporates you into one, or until an admin brings you a
            higher role.
          </Typography>
        ) : (
          <Box justifyContent={'center'} display="flex">
            <ProjectFormModal
              formik={formik}
              msg={'CREATE A NEW PROJECT'}
              loadingButton={loadingButton}
              open={open}
              handleClose={() => handleClose()}
            />{' '}
          </Box>
        )}
      </Paper>
    </>
  );
};
