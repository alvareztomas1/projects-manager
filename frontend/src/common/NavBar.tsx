import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { themePalette } from '../config/theme.config';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/auth.slice';
import { useCookies } from 'react-cookie';
import COOKIE_NAMES from '../constants/cookie';

export const NavBar: React.FC<{}> = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_NAMES.ACCESS_TOKEN,
  ]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeCookie(COOKIE_NAMES.ACCESS_TOKEN, cookies.accessToken);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: themePalette.BG_2,
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
        }}
        position="sticky"
      >
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 'x-large',
                    letterSpacing: '-0.08rem',
                    color: themePalette.PRIMARY,
                  }}
                >
                  Projects Manager
                </Typography>
              </Grid>
              <Button onClick={handleLogout}>Logout</Button>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
