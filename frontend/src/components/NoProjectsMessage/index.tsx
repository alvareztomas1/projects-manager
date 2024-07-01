import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { ROLES } from '../../constants/roles';
import { ProjectFormModal } from '../ProjectFormModal';
import { useFormik } from 'formik';
import { CreateProjectType } from '../../types/project.type';

type NoProjectMessageProps = {
  userRole: ROLES;
  formik: ReturnType<typeof useFormik<CreateProjectType>>;
  open: boolean;
  handleSaveProjectModalOpen: () => void;
  handleSaveProjectModalClose: () => void;
  loading: boolean;
};

export const NoProjectsMessage: React.FC<NoProjectMessageProps> = ({
  open,
  userRole,
  formik,
  handleSaveProjectModalOpen,
  handleSaveProjectModalClose,
  loading,
}) => {
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
            <Button
              sx={{ letterSpacing: '-0.02rem', fontWeight: 'bold' }}
              variant="contained"
              onClick={handleSaveProjectModalOpen}
              size="large"
            >
              {'CREATE A NEW PROJECT'}
            </Button>
            <ProjectFormModal
              formik={formik}
              msg={'CREATE A NEW PROJECT'}
              loadingButton={loading}
              open={open}
              handleClose={() => handleSaveProjectModalClose()}
            />{' '}
          </Box>
        )}
      </Paper>
    </>
  );
};
