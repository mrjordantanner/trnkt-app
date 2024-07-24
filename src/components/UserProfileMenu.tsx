import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useUserService } from '../contexts/UserServiceContext';

export default function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, currentUser, logoutAsync } = useUserService();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleMyAccount = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const handleLogout = () => {
    logoutAsync();
    handleClose();
  };

  return (
    <Box sx={{ pr: 4 }}>
      <IconButton onClick={handleClick}>
        <Avatar alt="User Profile" src="/" />
      </IconButton>
      <Menu
        sx={{ }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >

        <Typography sx={{ fontSize: '16px', fontWeight: '500', width: '250px', backgroundColor: 'cyan', padding: '10px' }}>
          User: {currentUser?.userName}
        </Typography>

        {isAuthenticated && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
        {isAuthenticated && <MenuItem onClick={handleMyAccount}>My Account</MenuItem>}

        {isAuthenticated ? 
          <MenuItem onClick={handleLogout}>Logout</MenuItem> : 
          <MenuItem onClick={handleLogin}>Sign In</MenuItem> }
        
      </Menu>
    </Box>
  );
}
