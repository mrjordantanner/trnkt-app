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
    height: '50%',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
    borderRadius: '15px',
  }

  const buttonStyle = {
    margin: '40px',
    width: '250px'
  }

  const inputFieldStyle  = {
    width: '300px',
    height: '75px',
    backgroundColor: 'white'
  }

  const notificationStyle = {
    fontSize: '18px', 
    fontWeight: '500', 
    margin: '10px',
    color: 'red',
    width: '60%', 
    textAlign: 'center'
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
      navigate('/collections');
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
      <Box sx={containerStyle}>
        <Box sx={contentsStyle}>

        <Typography variant="h4" sx={{ margin: '15px' }}>L O G I N</Typography>
        <Typography sx={notificationStyle}>{notificationMessage}</Typography>

        <TextField 
          label="email" 
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

        <Button variant="contained" sx={buttonStyle }onClick={onClickLogin}>Log In</Button>
       
        <Typography>No account yet?</Typography>
        <Link
					className='detail-text'
					href={'/register'}
					sx={{ color: 'cyan', fontWeight: 'bold' }}
        >
					Sign Up
				</Link>

        </Box>
      </Box>
	);
}
