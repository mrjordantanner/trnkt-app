import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useAssetContext } from '../contexts/AssetContext';
import { Box, IconButton, List, ListItem } from '@mui/material';
import { Home as HomeIcon, FavoriteBorder as FavoriteIcon } from '@mui/icons-material';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import CasinoIcon from '@mui/icons-material/Casino';

export default function MobileNavbar() {
	const { setSelectedAsset, setCollection } = useAssetContext();
    // //const navigate = useNavigate();
	// const { isAuthenticated, currentUser } = useUserService();
	// const { favoritesLists } = useFavoritesContext();

	const onClickCollections = () => {
		setSelectedAsset(null);
		setCollection(null);
	};

	return (
		<Box className='mobile-navbar'>
			<List sx={{ border: 'none', display: 'flex' }}>
			<ListItem>
					<IconButton
						component={RouterLink}
						aria-label=''
						onClick={onClickCollections}
						to='/'>
						<HomeIcon className='icon' />
					</IconButton>
				</ListItem>

				<ListItem>
					<IconButton
						component={RouterLink}
						aria-label=''
						onClick={onClickCollections}
						to='/nfts/collections/featured'>
						<FeaturedVideoIcon className='icon' />
					</IconButton>
				</ListItem>

				<ListItem>
					<IconButton
						component={RouterLink}
						aria-label=''
						onClick={onClickCollections}
						to='/nfts/random'>
						<CasinoIcon className='icon' sx={{ transform: 'rotate(45deg)' }} />
					</IconButton>
				</ListItem>

				<ListItem>
					<IconButton
						component={RouterLink}
						aria-label=''
						onClick={onClickCollections}
						to='/nfts/favorites'>
						<FavoriteIcon className='icon' />
					</IconButton>
				</ListItem>
			</List>
		</Box>
	);
}
