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
    <Box sx={{ pr: 4 }}>
      <IconButton className='account-icon' onClick={handleClick}>
        <Avatar alt="User Profile" src="/" className='account-icon' />
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

        <Typography 
        sx={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          width: '250px', 
          backgroundColor: 'darkslateblue', 
          padding: '5px 15px', 
          color: 'white' 
        }}>
          {currentUser ? currentUser?.userName : 'Not Signed In'}
        </Typography>

        {isAuthenticated && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
        {/* {isAuthenticated && <MenuItem onClick={handleMyAccount}>My Account</MenuItem>} */}

        {isAuthenticated ? 
          <MenuItem onClick={handleLogout}>Logout</MenuItem> : 
          <MenuItem onClick={handleLogin}>Sign In</MenuItem> }
        
      </Menu>
    </Box>
  );
}
