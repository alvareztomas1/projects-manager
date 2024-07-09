import React, { SyntheticEvent } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { LoadingButton } from '@mui/lab';
import { ACCESS_LEVEL } from '../../constants/access-levels';
import { useFormik } from 'formik';
import { AddUserToProjectData } from '../../types/project.type';
import { UserToProject } from '../../types/user.type';

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

type AddUserToProjectModalProps = {
  openModal: boolean;
  loadingAddUserButton: boolean;
  handleClose: () => void;
  options: Array<UserToProject>;
  formik: ReturnType<typeof useFormik<AddUserToProjectData>>;
  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserSelection: (
    event: SyntheticEvent<Element, Event>,
    selectedUser: UserToProject | null,
  ) => void;
};
export const AddUserToProjectModal: React.FC<AddUserToProjectModalProps> = ({
  openModal,
  loadingAddUserButton,
  handleClose,
  options,
  handleSearchOnChange,
  formik,
  handleUserSelection,
}) => {
  const isOptionEqualToValue = (option: UserToProject, value: any) =>
    option.label === value.label;
  return (
    <Modal open={openModal} aria-labelledby="child-modal-title">
      <Box
        sx={{ ...style, width: 500, borderRadius: '5px' }}
        alignContent={'center'}
        component="form"
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

        <Autocomplete
          options={options}
          onChange={handleUserSelection}
          value={formik.values.user}
          onInputChange={(event: any) => handleSearchOnChange(event)}
          isOptionEqualToValue={isOptionEqualToValue}
          renderOption={(props, option) => (
            <li key={`select-${option.id}`} {...props}>
              {option.label} (
              {option.firstName.split('')[0].toUpperCase() +
                option.firstName.slice(1)}{' '}
              {option.lastName.split('')[0].toUpperCase() +
                option.lastName.slice(1)}
              )
            </li>
          )}
          renderInput={(params) => (
            <TextField
              name="user"
              onChange={(event: any) => handleSearchOnChange(event)}
              onBlur={formik.handleBlur}
              value={formik.values.user}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={
                (formik.touched.user && formik.errors.user?.label) ||
                'The value entered must be equal to an username of the list'
              }
              {...params}
              label="Select a user"
              placeholder="Search for a user"
            />
          )}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth>
          <InputLabel id="access-level-label">Access Level</InputLabel>
          <Select
            labelId="access-level-label"
            label="Access Level"
            name="accessLevel"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accessLevel}
          >
            <MenuItem value={ACCESS_LEVEL.BASIC}>
              {ACCESS_LEVEL[ACCESS_LEVEL.BASIC]}
            </MenuItem>
            <MenuItem value={ACCESS_LEVEL.MAINTAINER}>
              {ACCESS_LEVEL[ACCESS_LEVEL.MAINTAINER]}
            </MenuItem>
            <MenuItem value={ACCESS_LEVEL.OWNER}>
              {ACCESS_LEVEL[ACCESS_LEVEL.OWNER]}
            </MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ mt: 2, mb: 1 }} />

        <Grid spacing={1} justifyContent={'center'} container>
          <Grid item>
            <LoadingButton
              sx={{ mt: 1 }}
              fullWidth
              variant="contained"
              size="large"
              loading={loadingAddUserButton}
              color="primary"
              onClick={formik.submitForm}
            >
              ADD
            </LoadingButton>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClose}
              sx={{ mt: 1, letterSpacing: '-0.02rem', fontWeight: 'bold' }}
              fullWidth
              variant="outlined"
              size="large"
            >
              CLOSE
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
