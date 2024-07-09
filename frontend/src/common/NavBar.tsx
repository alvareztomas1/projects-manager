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
import { useNavBar } from '../hooks';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC<{}> = () => {
  const { handleLogout } = useNavBar();
  const navigate = useNavigate();

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
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/')}
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
