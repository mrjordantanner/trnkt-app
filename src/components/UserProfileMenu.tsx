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
    navigate('/user/profile');
    handleClose();
  };

  // const handleMyAccount = () => {
  //   navigate('/user/profile');
  //   handleClose();
  // };

  const handleLogin = () => {
    navigate('/user/login');
    handleClose();
  };

  const handleLogout = () => {
    logoutAsync();
    handleClose();
  };

  return (
    <Box className='menu-icon-container'>
      <IconButton onClick={handleClick}>
        <Avatar alt="User Profile" src="/" 
          className='menu-icon' 
        />
      </IconButton>
      <Menu
        className='menu'
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

        <Typography className='menu-header'>
          {currentUser ? currentUser?.userName : 'Not Signed In'}
        </Typography>

        {isAuthenticated && <MenuItem className='menu-item' onClick={handleProfile}>Profile</MenuItem>}
        {/* {isAuthenticated && <MenuItem onClick={handleMyAccount}>My Account</MenuItem>} */}

        {isAuthenticated ? 
          <MenuItem className='menu-item' onClick={handleLogout}>Logout</MenuItem> : 
          <MenuItem className='menu-item' onClick={handleLogin}>Sign In</MenuItem> }
        
      </Menu>
    </Box>
  );
}
