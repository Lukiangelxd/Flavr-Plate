import * as React from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Hidden, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import '../Header/Header.css';
import Auth from '../../utils/auth';
import flavrPlate from '../../assets/Flavr Plate logo.jpg';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const loggedIn = Auth.loggedIn();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#D8A79D', backdropFilter: 'blur(10px)' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <img src={flavrPlate} alt="logo" className="logo" />
          </IconButton>
          <Typography variant="h6" component="div" className="company-name">
            <span style={{ fontFamily: 'Segoe Script', fontSize: '32px', fontWeight: 'bold' }}>Flavr Plate</span>
          </Typography>
        </div>

        {loggedIn ? (
        <Typography variant="h6" component="div" className="company-name" style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <Button
            color="inherit"
            component={Link}
            to="/create-recipe"  // Specify the link for creating a recipe!!!!!!
            sx={{ ...buttonStyles }}
          >
            Create a Recipe!
          </Button>
        </Typography>
        ): null }
        <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto' }}>
          {loggedIn ? (
            <>
              <Button
                color="inherit"
                href="/Profile"
                sx={{ ...buttonStyles }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                href="/"
                sx={{ ...buttonStyles }}
                onClick={() => Auth.logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Hidden mdUp>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuClick}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden mdDown>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ ...buttonStyles }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  sx={{ ...buttonStyles }}
                >
                  Sign Up
                </Button>
              </Hidden>
            </>
          )}
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/login">Login</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/signup">Sign Up</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const buttonStyles = {
  fontFamily: 'Segoe UI, sans-serif',
  '&:hover': {
    backgroundColor: '#F7D1C3',
    transition: '0.3s',
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: '#C48172',
    transform: 'scale(0.95)',
  },
};

export default Header;