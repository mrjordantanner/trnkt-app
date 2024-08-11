import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useAssetContext } from '../contexts/AssetContext';
import { Box, IconButton, List, ListItem } from '@mui/material';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
//import Home from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import CollectionsIcon from '@mui/icons-material/Collections';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';


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
			<List className='icon-list'>
				{/* <ListItem>
					<IconButton
						component={RouterLink}
						aria-label=''
						onClick={onClickCollections}
						to='/'>
						<Home className='icon' />
					</IconButton> 
				</ListItem> */}

				<ListItem sx={{ display: 'flex', flex: 1 }}>
					<IconButton
						component={RouterLink}
						aria-label='collections'
						onClick={onClickCollections}
						to='/nfts/collections/featured'>
						<CollectionsIcon className='icon' />
					</IconButton>
				</ListItem>

				<ListItem sx={{ display: 'flex', flex: 1 }}>
					<IconButton
						component={RouterLink}
						aria-label='random'
						onClick={onClickCollections}
						to='/nfts/random'>
						<CasinoIcon className='icon' />
					</IconButton>
				</ListItem>

				<ListItem sx={{ display: 'flex', flex: 1 }}>
					<IconButton
						component={RouterLink}
						aria-label='favorites'
						onClick={onClickCollections}
						to='/nfts/favorites'>
						<CollectionsBookmarkIcon className='icon' />
					</IconButton>
				</ListItem>
			</List>
		</Box>
	);
}
