import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Login } from '../utils/mutations';



const Header = () => {
    if (!Login) {
        return (
            <header>
                <h1>Flavr Plate</h1>
                <h2>Search for your favorite recipes</h2>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                    <TextField fullWidth label="Search" id="Search" />
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained">Login</Button>
                    <Button variant="contained">Signup</Button>
                </Stack>
            </header>
        );
    } else {
        return (
            <header>
                <h1>Flavr Plate</h1>
                <h2>Search for your favorite recipes</h2>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                    <TextField fullWidth label="Search" id="Search" />
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained">Profile</Button>
                    <Button variant="contained" disabled >Signup</Button>
                </Stack>
            </header>
        );
    }
};



export default Header;