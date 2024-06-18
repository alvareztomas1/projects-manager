import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import { Close, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/notification.context';
import { users } from '../../api/users.api';
import { useFormik } from 'formik';
import { SignUpValidate } from '../../utils/validateForm';

type SignUpDataType = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export const SignupPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { getError } = useNotification();

  const formik = useFormik<SignUpDataType>({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpValidate,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...userData } = values;
        const response = await users.create(userData);

        navigate(`/signup-success/${response.username}`);
      } catch (error) {
        getError((error as Error).message);
      }
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

            <Divider sx={{ mt: 1, mb: 2 }} />

            <Box
              alignItems={'center'}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <Grid gap={3} justifyContent={'center'} container>
                <Grid item>
                  <TextField
                    multiline
                    sx={{ width: '25ch' }}
                    variant="outlined"
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="alvareztomas99"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Grid>

                <Grid item>
                  <TextField
                    multiline
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    sx={{ width: '25ch' }}
                    placeholder="tomas@email.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    sx={{ width: '25ch' }}
                    multiline
                    variant="outlined"
                    type="text"
                    id="first-name"
                    name="firstName"
                    label="First name"
                    placeholder="Tomás"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>

                <Grid item>
                  <TextField
                    sx={{ width: '25ch' }}
                    multiline
                    variant="outlined"
                    type="text"
                    id="last-name"
                    name="lastName"
                    label="Last name"
                    placeholder="Alvarez"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>

                <Grid item>
                  <TextField
                    sx={{ width: '25ch' }}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Password"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    sx={{ width: '25ch' }}
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    label="Confirm password"
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, mt: 2 }}
                type="submit"
                size="large"
              >
                Sign up
              </Button>

              <Divider sx={{ mb: 1 }} />

              <Typography
                sx={{
                  mt: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
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
                  href="/login"
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
