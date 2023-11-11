// import dependencies
import { useState } from 'react';
import flavrPlate from '../assets/Flavr Plate logo.jpg';
import { useMutation } from '@apollo/client'; 
import { LOGIN } from '../utils/mutations'; 
import Auth from '../utils/auth';
import { createTheme, ThemeProvider } from '@mui/material';
import {Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    password: '',
    username: '',
  });

  const [loginUser, { error, data }] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <ThemeProvider theme={createTheme()}>
      <Box display="flex" height="100vh">
        {/* Container on the left (signup form) */}
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: '#B3EBF7',
                color: 'white',
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: '#D8A79D', fontFamily: 'Segoe Script', fontSize: '32px', fontWeight: 'bold' }}
            >
              Sign Up
            </Typography>

            <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
              {/* Username */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleInputChange}
              />

              {/* Email */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
              />

              {/* Password */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={handleInputChange}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#F7D1C3',
                    transition: '0.5s',
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    backgroundColor: '#C48172',
                    transform: 'scale(0.95)',
                  },
                }}
              >
                Sign Up
              </Button>
              {/* Link to login page */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" sx={{ color: '#B3EBF7', textDecoration: 'none' }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

        {/* Container on the right (image) */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ececec',
            flex: 1,
          }}
        >
          {/* Square */}
          <img
            src={flavrPlate}
            alt="Flavr Plate Logo"
            style={{ width: '100%', height: 'auto', maxWidth: '600px', maxHeight: '600px' }}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Signup;