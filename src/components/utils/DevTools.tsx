import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useAssetContext } from '../../contexts/AssetContext';
import { Box, IconButton, Typography, Modal } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { useUserService } from '../../contexts/UserServiceContext';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';

// Displays helpful debugging info and other misc dev tools
export default function DevTools() {
	const [isOpen, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const {
		selectedAsset,
		selectedCollection,
		collections,
		nfts,
		nextNftCursor,
		nextCollectionCursor,
		nftLimit,
	} = useAssetContext();
	const { isAuthenticated, currentUser } = useUserService();
	const { favoritesLists } = useFavoritesContext();

	return (
		<Box sx={{ pr: 2, pl: 2 }}>
			<IconButton onClick={handleOpen} sx={{ color: 'gray' }}>
				<BuildIcon />
			</IconButton>

			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'>
				<Box className='scrollbar properties-modal'>
					<Typography
						id='modal-title'
						variant='h6'
						component='h2'
						sx={{ color: 'cyan', fontWeight: 600 }}>
						DevTools
					</Typography>
					<Box id='modal-description' sx={{ mt: 2 }}>

						<Typography className='toolbar-item'>
							<strong>Collections.Length: </strong>
							{collections ? collections.length : '0'}
						</Typography>

						<Typography className='toolbar-item'>
							<strong>Nfts.Length: </strong>
							{nfts ? nfts.length : '0'}
						</Typography>

						<Typography className='toolbar-item'>
							<strong>Next Nft Cursor: </strong>
							{nextNftCursor ? nextNftCursor : 'null'}
						</Typography>

						<Typography className='toolbar-item'>
							<strong>Next Collection Cursor: </strong>
							{nextCollectionCursor ? nextCollectionCursor : 'null'}
						</Typography>

						<Typography className='toolbar-item'>
							<strong>Nft Batch Size: </strong>
							{nftLimit}
						</Typography>

						<Box className='divider'></Box>

						<Typography className='toolbar-item'>
							<strong>Selected Collection: </strong>
							{selectedCollection ? selectedCollection.name : 'null'}
						</Typography>
						<Typography className='toolbar-item'>
							<strong>Selected Asset: </strong>
							{selectedAsset ? selectedAsset.name : 'null'}
						</Typography>

						<Box className='divider'></Box>

						<Typography className='toolbar-item'>
							<strong>Favorites Lists: </strong>
							{favoritesLists?.length}
						</Typography>

						{favoritesLists.map((list =>
							<Typography key={list.listId}>{list.name}: {list.nfts.length}</Typography>
						))}

						<Box className='divider'></Box>

						<Typography className='toolbar-item'>
							<strong>IsAuthenticated: </strong>
							{`${isAuthenticated}`}
						</Typography>
						<Typography className='toolbar-item'>
							<strong>CurrentUser: </strong>
							{currentUser ? currentUser.userName : 'null'}
						</Typography>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}
