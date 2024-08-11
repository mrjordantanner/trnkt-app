import React, { useState } from 'react';
import { Box, Button, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { useUserService } from '../contexts/UserServiceContext';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register() {
	const [notificationMessage, setNotificationMessage] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const { registerNewUserAsync } = useUserService();
	const navigate = useNavigate();

	// const buttonStyle = {
	// 	border: '1px solid white',
	// 	backgroundColor: 'blue',
	// 	color: 'white',
	// 	margin: '10px',
	// 	width: '250px',
	// };

	const inputFieldStyle = {
		width: '300px',
		height: '75px',
		backgroundColor: 'white',
	};

	const errorMessageStyle = {
		fontSize: '1.25rem',
		fontWeight: '800',
		color: 'red',
		width: '60%',
		textAlign: 'center',
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === 'NumpadEnter') {
			onClickRegister();
		}
	};

	const onClickRegister = () => {
		if (password !== confirmPassword) {
			setNotificationMessage('Passwords must match');
			return;
		}
		registerNewUserAsync(email, userName, password);
		navigate('/nfts/collections/featured');
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

	return (
		<Box sx={{ height: '100vh', width: '100vw' }}>
            <Box className='container'>
                <Box 
				className='flex-column-center' 
				sx={{ justifyContent: 'center', height: '100%' }} >

					<Typography variant='h3' sx={{ margin: '15px' }}>
						SIGN UP
					</Typography>

					<Typography sx={errorMessageStyle}>{notificationMessage}</Typography>

					<TextField
						label='Email'
						type='email'
						sx={inputFieldStyle}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onKeyDown={handleKeyDown}
					/>

					<TextField
						label='User Name'
						sx={inputFieldStyle}
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						onKeyDown={handleKeyDown}
					/>

					<TextField
						label='Password'
						type={showPassword ? 'text' : 'password'}
						sx={inputFieldStyle}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={handleKeyDown}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<TextField
						label='Confirm Password'
						type={showConfirmPassword ? 'text' : 'password'}
						sx={inputFieldStyle}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						onKeyDown={handleKeyDown}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle confirm password visibility"
										onClick={handleClickShowConfirmPassword}
										edge="end"
									>
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button 
						className='button'
						variant='contained' 
						onClick={onClickRegister}
						sx={{ margin: '10px', width: '200px' }}
						>
						Register
					</Button>

					<Typography>Already have an account?</Typography>
					<a
						className='link'
						href={'/user/login'} >
						Log In
					</a>

				</Box>
			</Box>
		</Box>
	);
}
