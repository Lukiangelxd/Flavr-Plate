import * as React from 'react';
import {Button, Stack, AppBar, Toolbar, IconButton, Typography}  from '@mui/material';
import '../Header/Header.css';

function Header() {
    return (
      <AppBar position="static" style={{ backgroundColor: '#D8A79D', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <img src="https://user-images.githubusercontent.com/133689246/281239100-44f2fe44-0205-4b11-9770-555a45919dd7.jpg" alt="logo" className="logo" />
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
  
  export default Header;