import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Link, IconButton, InputAdornment } from '@mui/material';
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

	// Styles
	const containerStyle = {
		display: 'flex',
		height: '100vh',
		width: '100vw',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#121212',
	};

	const contentsStyle = {
		display: 'flex',
		height: '80%',
		width: '50%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#353535',
	};

	const buttonStyle = {
		border: '1px solid white',
		backgroundColor: 'blue',
		color: 'white',
		margin: '10px',
		width: '250px',
	};

	const inputFieldStyle = {
		width: '300px',
		height: '75px',
		backgroundColor: 'white',
	};

	const notificationStyle = {
		fontSize: '18px',
		fontWeight: '500',
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
		navigate('/collections');
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

	return (
		<Box sx={containerStyle}>
			<Box sx={contentsStyle}>
				<Typography variant='h3' sx={{ margin: '15px' }}>
					S I G N U P
				</Typography>
				<Typography sx={notificationStyle}>{notificationMessage}</Typography>

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

				<Button sx={buttonStyle} onClick={onClickRegister}>
					Register
				</Button>

				<Typography>Already have an account?</Typography>
				<Link
					className='detail-text'
					href={'/login'}
					sx={{ color: 'cyan', fontWeight: 'bold' }}>
					Log In
				</Link>
			</Box>
		</Box>
	);
}
