// import dependencies
import { useState } from 'react';
import flavrPlate from '../assets/Flavr Plate logo.jpg';
import { useMutation } from '@apollo/client'; 
import { CreateUser } from '../utils/mutations'; 
import Auth from '../utils/auth';
import { createTheme, ThemeProvider } from '@mui/material';
import {Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

function Signup (){
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '',
        userName: '' 
    });
    const [addUser, { error, data }] = useMutation(CreateUser);
    const handleInputChange = (event) => {
      console.log(event.target)
        const value  = event.target.value;
        const  name  = event.target.name
        console.log(name, value)
        setFormData({ ...formData, [name]: value });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
              variables: { ...formData },
            });
      
            Auth.login(data.addUser.token);
          } catch (err) {
            console.error(err);
          }
    };

    const defaultTheme = createTheme();

    return (
      <ThemeProvider theme={defaultTheme}>
      <Box display="flex" height="100vh">
        {/* Container on the left (image) */}
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
            src={flavrPlate} // Replace with the URL of your square image
            alt="Flavr Plate Logo"
            style={{ width: '100%', height: 'auto', maxWidth: '600px', maxHeight: '600px' }}
          />
        </Container>

        {/* Container on the right (login form) */}
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
              Sign UP
            </Typography>

            <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="userName"
                label="Username"
                autoComplete="Username"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4CAF50',
                  fontFamily: 'Segoe UI, sans-serif',
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
              <Grid item>
              <Link to="/login" variant="body2" sx={{ color: '#B3EBF7', textDecoration: 'none' }}>
                {"Already have an account? Sign In"}
              </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Signup;