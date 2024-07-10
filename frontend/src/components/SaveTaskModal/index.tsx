import React from 'react';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { LoadingButton } from '@mui/lab';
import { STATUS } from '../../constants/status';
import { useFormik } from 'formik';
import { AddTask } from '../../types/task.type';

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

type SaveTaskModalProps = {
  openModal: boolean;
  loadingSaveTaskButton: boolean;
  handleClose: () => void;
  formik: ReturnType<typeof useFormik<AddTask>>;
};

export const SaveTaskModal: React.FC<SaveTaskModalProps> = ({
  openModal,
  loadingSaveTaskButton,
  handleClose,
  formik,
}) => {
  return (
    <Modal open={openModal} aria-labelledby="child-modal-title">
      <Stack
        sx={{ ...style, width: 500, borderRadius: '5px' }}
        component={'form'}
        spacing={2}
        onSubmit={formik.handleSubmit}
      >
        <Typography
          display={'flex'}
          id="child-modal-title"
          justifyContent={'center'}
          variant="h6"
        >
          ADD USER TO PROJECT
        </Typography>

        <Divider sx={{ mt: 1, mb: 2 }} />

        <TextField
          fullWidth
          label="Title"
          placeholder="Website Redesign"
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
          placeholder="Update the design and functionality of the company website to improve user experience and engagement."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            <MenuItem value={STATUS.PENDING}>{STATUS[STATUS.PENDING]}</MenuItem>
            <MenuItem value={STATUS.IN_PROGRESS}>
              {STATUS[STATUS.IN_PROGRESS].replace('_', ' ')}
            </MenuItem>
            <MenuItem value={STATUS.COMPLETE}>
              {STATUS[STATUS.COMPLETE]}
            </MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.status && formik.errors.status
              ? formik.errors.status
              : 'Select the status of the task'}
          </FormHelperText>
        </FormControl>

        <Grid spacing={1} justifyContent={'center'} container>
          <Grid item>
            <LoadingButton
              fullWidth
              variant="contained"
              size="large"
              loading={loadingSaveTaskButton}
              color="primary"
              onClick={formik.submitForm}
            >
              ADD
            </LoadingButton>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClose}
              sx={{ letterSpacing: '-0.02rem', fontWeight: 'bold' }}
              fullWidth
              variant="outlined"
              size="large"
            >
              CLOSE
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};
