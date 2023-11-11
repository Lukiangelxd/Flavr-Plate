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
    return (
    <main className="flex-row justify-center mb-4">
        {data ? (
            <p>
             Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
            </p>
        ) : (
        <Box
        component="form"
        sx={{
        '   & .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
        >
            <TextField
            required
            id="outlined-required"
            name="userName"
            label="Required"
            placeholder="username"
            onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              name="email"
              label="Required"
              placeholder="email"
             onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              name="password"
              label="Required"
              placeholder="password"
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
              type="submit">Submit</Button>
        </Box>
        )}
        {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
        )}
    </main>
  );
}

export default Signup;