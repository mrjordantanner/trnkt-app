import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Link } from '@mui/material';
import { useUserService } from '../contexts/UserServiceContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loginAsync } = useUserService();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   //setNotificationMessage("");
  // }, []);

  const inputFieldStyle  = {
    width: '300px',
    height: '75px',
    bgcolor: 'white'
  }

  const notificationStyle = {
    fontSize: '18px', 
    fontWeight: '500', 
    margin: '10px',
    color: 'red',
    width: '60%', 
    textAlign: 'center',
  }

  const onClickLogin = async () => {
    if (!email) {
      setNotificationMessage("Email must be provided.");
      return;
    }
    if (!password) {
      setNotificationMessage("Password must be provided.");
      return;
    }

    const user = await loginAsync(email, password);
    
    if (user) {
      setNotificationMessage("");
      console.log(`Successfully logged in User: - Email: ${user.email}, UserName: ${user.userName}, UserId: ${user.userId}, `);
      navigate('/nfts/collections/featured');
    }
    else {
      setNotificationMessage("Incorrect email or password.");
      return;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      onClickLogin();
    }
  };

  return (
    <Box className='full-height-minus-bars'>
      <Box className='container'>
        <Box className='flex-column-center' sx={{ justifyContent: 'center', height: '100%' }}>

        <Typography variant="h4" sx={{ margin: '15px' }}>SIGN IN</Typography>
        <Typography sx={notificationStyle}>{notificationMessage}</Typography>

        <TextField 
          label="email" 
          variant='outlined'
          sx={inputFieldStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          />

        <TextField 
          label="password" 
          type="password" 
          sx={inputFieldStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          />

        <Button 
        variant="contained" 
        sx={{ margin: '40px', width: '250px'}} 
        onClick={onClickLogin}>
          Log In
          </Button>
       
        <Typography>No account yet?</Typography>
        <Link
					className='detail-text'
					href={'/user/register'}
					sx={{ color: 'cyan', fontWeight: 'bold' }}>
					Create a Free Account
          </Link>

        </Box>
      </Box>
    </Box>
	);
}
