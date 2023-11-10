// import dependencies
import { useState } from 'react';
import flavrPlate from '../assets/Flavr Plate logo.jpg';
import { useMutation } from '@apollo/client'; 
import { LOGIN } from '../utils/mutations'; 
import Auth from '../utils/auth';
import { createTheme, ThemeProvider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import LinkMui from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login() {
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
              Sign in
            </Typography>

            <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                autoComplete="username"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                Sign In
              </Button>
              <Grid item>
                <LinkMui href="#" variant="body2" sx={{ color: '#B3EBF7', textDecoration: 'none' }}>
                  {"Don't have an account? Sign Up"}
                </LinkMui>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login;