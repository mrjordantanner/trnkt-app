import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, List, ListItem } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
//import { useUserService } from '../contexts/UserServiceContext';
import UserProfileMenu from './UserProfileMenu';
import BackButton from './BackButton';

export default function Navbar() {
	const { setSelectedAsset, setCollection, selectedAsset, selectedCollection } = useAssetContext();

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

			{/* Placeholder */}
			{/* <Box className='nav-logo'/> */}

			<Box className='desktop-only'>
				<List sx={{ border: 'none' }}>
					<ListItem>
						<Button
							className='nav-button'
							component={RouterLink}
							onClick={onClickCollections}
							to='/nfts/collections/featured'>
							F E A T U R E D
						</Button>
					</ListItem>

					<ListItem>
						<Button className='nav-button' component={RouterLink} to='/nfts/random'>
							R A N D O M I Z E
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

			<UserProfileMenu />
		</Box>
	);
}
