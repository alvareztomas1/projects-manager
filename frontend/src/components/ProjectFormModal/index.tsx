import React from 'react';
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { CreateProjectType } from '../../types/project.type';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: themePalette.BG_2,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type ProjectFormModalProps = {
  open: boolean;
  msg: string;
  loadingButton: boolean;
  formik: ReturnType<typeof useFormik<CreateProjectType>>;
  handleClose: () => void;
};

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  formik,
  open,
  handleClose,
  loadingButton,
  msg,
}) => {
  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{ ...style, width: 500, borderRadius: '5px' }}
        component="form"
        onSubmit={formik.handleSubmit}
        alignContent={'center'}
      >
        <Typography
          fontWeight={'bold'}
          display={'flex'}
          justifyContent={'center'}
          variant="h6"
          letterSpacing={'-0.05rem'}
        >
          {msg}
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <TextField
          fullWidth
          label="Title"
          placeholder="Developing a Team Task Tracker"
          margin="normal"
          variant="outlined"
          id="title"
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          multiline
          fullWidth
          rows={6}
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          placeholder="Creating a tool to help teams track tasks efficiently. The project aims to simplify task assignment, progress monitoring, and team collaboration."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <LoadingButton
          sx={{ mt: 1, letterSpacing: '-0.02rem' }}
          fullWidth
          variant="contained"
          size="large"
          loading={loadingButton}
          onClick={formik.submitForm}
        >
          CONFIRM
        </LoadingButton>
        <Button
          onClick={handleClose}
          sx={{ mt: 1, letterSpacing: '-0.02rem', fontWeight: 'bold' }}
          fullWidth
          variant="outlined"
          size="large"
        >
          CLOSE
        </Button>
      </Box>
    </Modal>
  );
};
