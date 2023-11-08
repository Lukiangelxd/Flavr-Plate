//import dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client'; 
import LOGIN_USER from '../utils/mutations'; 
import Auth from '../utils/auth';
import { purple } from '@mui/material/colors';



function Login() {
    //State will store user data
    const [formData, setFormData] = useState({ 
        password: '',
        username: '',
    });
    const [loginUser, { error,data }] = useMutation(LOGIN_USER);
    //function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    //Form Submission function
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
        <main className="flex-row justify-center mb-4">
        {data ? (
          <p>
            Success! You are now logged in.{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
            <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
            >
        <TextField
            required
            id="outlined-required-email"
            label="Email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-required-password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            sx={{
            color: (theme) => theme.palette.getContrastText(purple[500]),
            backgroundColor: purple[500],
            '&:hover': {
            backgroundColor: purple[700],
            },
        }}
            type="submit">Login</Button>
        </Box>
      )}
      {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}
            </div>
        )}
    </main>
  );
}

export default Login;



