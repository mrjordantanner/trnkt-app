import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useUserService } from '../contexts/UserServiceContext';

const UserProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, currentUser, logout } = useUserService();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('click');
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
    logout();
    handleClose();
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Avatar alt="User Profile" src="/path/to/profile/photo.jpg" />
      </IconButton>
      <Menu
      sx={{
        width: '250px'
      }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >

        <Typography sx={{ fontSize: '16px', fontWeight: '500', width: '200px', backgroundColor: 'cyan', padding: '10px' }}>
          Menu
        </Typography>
        {isAuthenticated && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
        {isAuthenticated && <MenuItem onClick={handleMyAccount}>My Account</MenuItem>}

        {isAuthenticated ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : <MenuItem onClick={handleLogin}>Sign In</MenuItem> }
        
      </Menu>
    </Box>
  );
};

export default UserProfileMenu;
;