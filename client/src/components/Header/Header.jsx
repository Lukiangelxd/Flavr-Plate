import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../Header/Header.css';



function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <img src="https://user-images.githubusercontent.com/133689246/281239100-44f2fe44-0205-4b11-9770-555a45919dd7.jpg" alt="logo" />
            </div>
            <div className="header__right">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" href="/login">Login</Button>
                    <Button variant="contained" href="/signup">Sign Up</Button>
                </Stack>
            </div>
        </div>
    )
}


export default Header;