import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { Close, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type LoginDataType = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export const SignupPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [signUpData, setLogInData] = React.useState<LoginDataType>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLogInData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
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
            elevation={24}
          >
            <Box display={'flex'} alignItems="center">
              <Typography sx={{ mb: 1, mr: 'auto' }} variant="h4">
                Sign up
              </Typography>
              <IconButton onClick={() => navigate('/')}>
                <Close />
              </IconButton>
            </Box>

            <Divider sx={{ mt: 1, mb: 1 }} />

            <Box alignItems={'center'} component="form" onSubmit={handleSubmit}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                      multiline
                      type="text"
                      id="username"
                      name="username"
                      label="Username"
                      placeholder="alvareztomas99"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      multiline
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="tomas@email.com"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="last-name">First name</InputLabel>
                    <OutlinedInput
                      multiline
                      type="text"
                      id="first-name"
                      name="firstName"
                      label="First name"
                      placeholder="Tomás"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="last-name">Last name</InputLabel>
                    <OutlinedInput
                      multiline
                      type="text"
                      id="last-name"
                      name="lastName"
                      label="Last name"
                      placeholder="Alvarez"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                          ></IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                      Confirm password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm-password"
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                          ></IconButton>
                        </InputAdornment>
                      }
                      label="Confirm password"
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, mt: 1 }}
                type="submit"
                size="large"
              >
                Sign up
              </Button>

              <Divider sx={{ mb: 2 }} />

              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ¿Already member?
                <Link
                  sx={{
                    ml: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => navigate('/login')}
                  underline="hover"
                >
                  Log in <Login sx={{ ml: 0.3 }} fontSize="small" />
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
