import * as React from 'react';
import { Button, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import '../Header/Header.css';
import Auth from '../../utils/auth';
import flavrPlate from '../../assets/Flavr Plate logo.jpg';



function Header() {
  const loggedIn = Auth.loggedIn();
  if (loggedIn) {
    return (
      <AppBar position="static" style={{ backgroundColor: '#D8A79D', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <img src={flavrPlate} alt="logo" className="logo" />
          </IconButton>
          <Typography variant="h6" component="div" className="company-name">
            <span style={{ fontFamily: 'Segoe Script', fontSize: '32px', fontWeight: 'bold' }}>Flavr Plate</span>
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto' }}>
            <Button
              color="inherit"
              href="/Profile"
              sx={{
                fontFamily: 'Segoe UI, sans-serif',
                '&:hover': {
                  backgroundColor: '#F7D1C3', // Lighter shade for hover
                  transition: '0.3s',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: '#C48172', // Darker shade for click
                  transform: 'scale(0.95)',
                },
              }}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              href="/"
              sx={{
                fontFamily: 'Segoe UI, sans-serif',
                '&:hover': {
                  backgroundColor: '#F7D1C3', // Lighter shade
                  transition: '0.3s',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: '#C48172', // Darker shade
                  transform: 'scale(0.95)',
                },
              }}
              onClick={() => Auth.logout()}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static" style={{ backgroundColor: '#D8A79D', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <img src={flavrPlate} alt="logo" className="logo" />
          </IconButton>
          <Typography variant="h6" component="div" className="company-name">
            <span style={{ fontFamily: 'Segoe Script', fontSize: '32px', fontWeight: 'bold' }}>Flavr Plate</span>
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto' }}>
            <Button
              color="inherit"
              href="/login"
              sx={{
                fontFamily: 'Segoe UI, sans-serif',
                '&:hover': {
                  backgroundColor: '#F7D1C3', // Lighter shade for hover
                  transition: '0.3s',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: '#C48172', // Darker shade for click
                  transform: 'scale(0.95)',
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              href="/signup"
              sx={{
                fontFamily: 'Segoe UI, sans-serif',
                '&:hover': {
                  backgroundColor: '#F7D1C3', // Lighter shade
                  transition: '0.3s',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: '#C48172', // Darker shade
                  transform: 'scale(0.95)',
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;