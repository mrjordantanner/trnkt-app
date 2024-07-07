import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, List, ListItem } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
//import { useUserService } from '../contexts/UserServiceContext';
import UserProfileMenu from './UserProfileMenu';

export default function Navbar() {
	const { setSelectedAsset, setCollection } = useAssetContext();

	//const { isAuthenticated, logout } = useUserService();
    //const navigate = useNavigate();
	
	const onClickCollections = () => {
		setSelectedAsset(null);
		setCollection(null);
	}

	return (
		<Box className='navbar-container'>
			{/* <Box className='navbar-blur'></Box> */}
			<List sx={{ }}>

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

				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-primary'
						component={RouterLink}
						to='/random'>
						R A N D O M
					</Button>
				</ListItem>

				<ListItem>
					<Button
						sx={{color: 'white'}}
						className='button outline-primary'
						component={RouterLink}
						to='/favorites'>
						F A V O R I T E S
					</Button>
				</ListItem>
			</List>

			<UserProfileMenu />

		</Box>
	);
}
