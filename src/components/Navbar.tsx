import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
import { useUserService } from '../contexts/UserServiceContext';
import UserProfileMenu from './UserProfileMenu';
import BackButton from './BackButton';

export default function Navbar() {
	const { setSelectedAsset, setCollection, selectedAsset, selectedCollection } = useAssetContext();

	const { currentUser, isAuthenticated } = useUserService();
	//const navigate = useNavigate();

	const onClickCollections = () => {
		setSelectedAsset(null);
		setCollection(null);
	};

	const clearSelections = () => {
		if (selectedAsset) {
            setSelectedAsset(null);
            return;
        }

        if (selectedCollection) {
            setCollection(null);
            //navigate('/nfts/collections/featured');
            return;
        }
	}

	return (
		<Box className='navbar'>
			{/* <Box className='blur-layer'></Box> */}

			{(selectedCollection || selectedAsset) && (
				<BackButton clearSelections={clearSelections}/>
			)}

			<Button className='nav-logo' component={RouterLink} to='/'>
				TRNKT
			</Button>

			<Box className='desktop-only'>
				<List sx={{ border: 'none' }}>
					<ListItem>
						<Button
							className='nav-button'
							component={RouterLink}
							onClick={onClickCollections}
							to='/nfts/collections/featured'>
							C O L L E C T I O N S
						</Button>
					</ListItem>

					<ListItem>
						<Button
							className='nav-button'
							component={RouterLink}
							to='/nfts/favorites'>
							F A V O R I T E S
						</Button>
					</ListItem>
				</List>
			</Box>

			<Box className='flex-center'>
				{isAuthenticated ? 
				(<Typography className='p'><strong>{currentUser?.userName}</strong></Typography>) :
				(<a href='/user/login' className='link'>Sign In</a>)}
				<UserProfileMenu />
			</Box>
		</Box>
	);
}
