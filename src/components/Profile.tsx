import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useUserService } from '../contexts/UserServiceContext';

export default function Profile() {

  const { currentUser } = useUserService();
  
  // useEffect(() => {

  // }, []);

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

  const onClickChangePassword = () => {

  }

  return (
      <Box sx={containerStyle}>
        <Box sx={contentsStyle}>

        <Typography variant="h4" sx={{ margin: '15px' }}>User Profile</Typography>
        <Typography sx={{ color: 'cyan' }}>{currentUser?.userName}</Typography>
        <Typography sx={{ color: 'cyan'  }}>text text text</Typography>


        <Button sx={buttonStyle} onClick={onClickChangePassword}>Change Password</Button>


        </Box>
      </Box>
	);
}
