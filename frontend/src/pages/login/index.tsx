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
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { themePalette } from '../../config/theme.config';
import {
  Close,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { LoginValidate } from '../../utils/validateForm';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../redux/hooks';
import { authThunk } from '../../redux/thunks/auth.thunk';

type LoginType = {
  userIdentifier: string;
  password: string;
  remember: boolean;
};

export const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik<LoginType>({
    initialValues: {
      userIdentifier: '',
      password: '',
      remember: false,
    },
    validationSchema: LoginValidate,
    onSubmit: async (values) => {
      const { remember, ...userData } = values;

      await dispatch(authThunk(userData));
      navigate('/');

      // TODO: FINISH LOG IN
    },
  });

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
              <Avatar sx={{ mb: 1, mr: 'auto', bgcolor: 'secondary.main' }}>
                <LockOutlined />
              </Avatar>
              <IconButton onClick={() => navigate('/')}>
                <Close />
              </IconButton>
            </Box>

            <Typography variant="h4">Sign in</Typography>

            <Divider sx={{ mt: 1 }} />

            <Box
              alignItems={'center'}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                margin="normal"
                type="text"
                id="userIdentifier"
                name="userIdentifier"
                label="Username / Email"
                variant="outlined"
                fullWidth
                value={formik.values.userIdentifier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userIdentifier &&
                  Boolean(formik.errors.userIdentifier)
                }
                helperText={
                  formik.touched.userIdentifier && formik.errors.userIdentifier
                }
              />
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
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
                helperText={formik.touched.password && formik.errors.password}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    color="primary"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
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
                onClick={() => navigate('/signup')}
                size="large"
              >
                Sign up
              </Button>
              <Divider sx={{ mb: 1 }} />

              <Link
                sx={{ width: '100%', mb: 1, mr: 'auto', cursor: 'pointer' }}
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
