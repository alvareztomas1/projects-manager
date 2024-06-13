import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { Close, LockOutlined } from '@mui/icons-material';

type LoginType = {
  user: string;
  password: string;
  remember: boolean;
};

export const LoginPage: React.FC<{}> = () => {
  const [logInData, setLogInData] = React.useState<LoginType>({
    user: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setLogInData({
      ...logInData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Paper
            sx={{
              backgroundColor: themePalette.BG_2,
              padding: 3,
              borderRadius: '10px',
            }}
          >
            <Box display={'flex'} alignItems="center">
              <Avatar sx={{ mb: 1, mr: 'auto', bgcolor: 'secondary.main' }}>
                <LockOutlined />
              </Avatar>
              <IconButton href="/">
                <Close />
              </IconButton>
            </Box>

            <Typography variant="h4">Sign in</Typography>

            <Divider sx={{ mt: 1 }} />

            <Box alignItems={'center'} component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                type="text"
                id="user"
                name="user"
                label="Username / Email"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                type="password"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={logInData.remember}
                    color="primary"
                    onChange={handleChange}
                  />
                }
                label="Remember Me"
                labelPlacement="end"
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, mt: 1 }}
                type="submit"
                size="large"
              >
                Log in
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                href="signup"
                size="large"
              >
                Sign up
              </Button>
              <Divider sx={{ mb: 1 }} />

              <Link
                sx={{ width: '100%', mb: 1, mr: 'auto' }}
                href="/forgot-password"
                underline="hover"
              >
                ¿Forgot password?
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
