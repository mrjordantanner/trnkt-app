import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem } from '@mui/material';

import { useAssetContext } from '../contexts/AssetContext';
import { useUserService } from '../contexts/UserServiceContext';

import UserProfileMenu from './UserProfileMenu';

export default function Navbar() {
	const { setSelectedAsset, setCollection } = useAssetContext();
	const { isAuthenticated, currentUser, logout } = useUserService();
    const navigate = useNavigate();
	

	const onClickCollections = () => {
		setSelectedAsset(null);
		setCollection(null);
	}

	const onClickLogout = () => {
		logout();
	}

	const onClickLogin = () => {
		navigate('/login');
	}

	const onClickUserProfile = () => {
		if (isAuthenticated) {
			navigate('/profile');
		} else {
			navigate('/login');
		}

	}

	const profileButtonStyle = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		color: 'black',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 100,
		backgroundColor: 'yellow',
		cursor: 'pointer'
   };

	return (
		<>
		<Box className='navbar-container'>
			{/* <Box className='navbar-blur'></Box> */}
			<List sx={{ backgroundColor: 'maroon' }}>
				<ListItem>
					<Button className='nav-link' component={RouterLink} to='/'>
						TRNKT
					</Button>
				</ListItem>
				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-secondary'
						component={RouterLink}
						onClick={onClickCollections}
						to='/collections'
						>
						C O L L E C T I O N S
					</Button>
				</ListItem>
				{/* <ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-secondary'
						component={RouterLink}
						to='/explore'
						>
						E X P L O R E
					</Button>
				</ListItem> */}
				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-primary'
						component={RouterLink}
						to='/random'>
						R A N D O M
					</Button>
				</ListItem>

				{isAuthenticated ? 
					<ListItem>
						<Button
							sx={{color: 'white'}}
							className='button outline-primary'
							component={RouterLink}
							onClick={onClickLogout}
							to='/logout'>
							L O G O U T
						</Button>
					</ListItem> 
					: 
					<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-primary'
						component={RouterLink}
						onClick={onClickLogin}
						to='/login'>
						L O G I N
					</Button>
				</ListItem>
				}

				{/* <ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-primary'
						component={RouterLink}
						to='/favorites'>
						F A V O R I T E S [ {numberFavorites} ]
					</Button>
				</ListItem> */}
			</List>

			{/* <Button sx={{ display: 'flex', width: '150px', height: '50px' }} onClick={onClickUserProfile}>
				<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
					{isAuthenticated && currentUser?.userName }
				</Typography>
			</Button> */}


			<UserProfileMenu />

		</Box>

		</>
	);
}
