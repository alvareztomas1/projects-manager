import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { themePalette } from '../../config/theme.config';
import { Close } from '@mui/icons-material';

export const SuccessSignUpPage: React.FC<{}> = () => {
  const { username } = useParams();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 2 }}
    >
      <Paper
        sx={{
          backgroundColor: themePalette.BG_2,
          padding: 3,
          borderRadius: '10px',
          maxWidth: '600px',
          width: '100%',
        }}
        elevation={24}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            Welcome, {username}!
          </Typography>
          <IconButton href="/login">
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your account has been created successfully
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for joining us. You can now log in to access your account.
        </Typography>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          href="/login"
        >
          Log In
        </Button>
      </Paper>
    </Grid>
  );
};
