import * as React from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import '../Header/Header.css';
import Auth from '../../utils/auth';

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
          <img src="https://user-images.githubusercontent.com/133689246/281239100-44f2fe44-0205-4b11-9770-555a45919dd7.jpg" alt="logo" className="logo" />
          </IconButton>
          <Typography variant="h6" component="div" className="company-name" style={{ marginLeft: '10px' }}>
            <span style={{ fontFamily: 'Segoe Script', fontSize: '32px', fontWeight: 'bold' }}>Flavr Plate</span>
          </Typography>
        </div>
        <div>
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
            {loggedIn ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/Profile"
                  sx={{ ...buttonStyles }}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  sx={{ ...buttonStyles }}
                  onClick={() => Auth.logout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </Hidden>
        </div>
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
