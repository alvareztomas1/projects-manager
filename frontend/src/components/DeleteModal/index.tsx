import React from 'react';
import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { LoadingButton } from '@mui/lab';

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

type DeleteProjectModalProps = {
  id: string;
  open: boolean;
  msg: string;
  loading: boolean;
  handleConfirmDelete: (id: string) => Promise<void>;
  handleClose: () => void;
};

export const DeleteModal: React.FC<DeleteProjectModalProps> = ({
  id,
  open,
  msg,
  handleClose,
  loading,
  handleConfirmDelete,
}) => {
  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{ ...style, width: 500, borderRadius: '5px' }}
        alignContent={'center'}
      >
        <Typography display={'flex'} justifyContent={'center'} variant="h6">
          {msg}
        </Typography>

        <Divider sx={{ m: 1 }} />

        <Grid spacing={1} justifyContent={'center'} container>
          <Grid item>
            <LoadingButton
              sx={{ mt: 1 }}
              fullWidth
              variant="contained"
              size="large"
              loading={loading}
              color="error"
              onClick={() => handleConfirmDelete(id)}
            >
              CONFIRM
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
