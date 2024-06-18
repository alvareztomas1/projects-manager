import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { themePalette } from '../config/theme.config';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: themePalette.BG_2 }} position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid item>
                <Typography>Projects Manager</Typography>
              </Grid>
              <Grid item>
                <Stack spacing={2} direction={'row'}>
                  <Button onClick={() => navigate('login')} variant="contained">
                    Login
                  </Button>
                  <Button href="signup" variant="outlined">
                    Register
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
