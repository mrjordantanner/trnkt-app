import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
//import { useUserService } from '../contexts/UserServiceContext';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  // Styles
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  }

  const contentsStyle = {
    display: 'flex',
    height: '80%',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#353535',
  }

  const buttonStyle = {
    border: "1px solid white",
    backgroundColor: "blue",
    color: "white",
    margin: '10px',
    width: '250px'
  }

  const onClickLogin = () => {
    navigate('/login');
  }




  return (
      <Box sx={containerStyle}>
        <Box sx={contentsStyle}>

        <Typography variant="h4" sx={{ margin: '15px' }}>YOU HAVE BEEN LOGGED OUT.</Typography>

        <Button sx={buttonStyle} onClick={onClickLogin}>Log Back In</Button>
        </Box>
      </Box>
	);
}
