import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useAssetContext } from '../../contexts/AssetContext';
import { Box, IconButton, Typography, Modal } from '@mui/material';
import  BuildIcon from '@mui/icons-material/Build';
import { useUserService } from '../../contexts/UserServiceContext';
import { useFavoritesContext } from '../../contexts/FavoritesServiceContext';

// Displays helpful debugging info and other misc dev tools
export default function DevTools() {
	const [isOpen, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { selectedAsset, selectedCollection } = useAssetContext();
	const { isAuthenticated, currentUser } = useUserService();
	const { favoritesLists } = useFavoritesContext();

	return (
		<Box sx={{ pr: 2, pl: 2 }}>
			<IconButton
				onClick={handleOpen}
				sx={{ color: 'gray' }}>
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
							{selectedCollection?.name}
						</Typography>
						<Typography className='toolbar-item'>
							{selectedAsset?.name}
						</Typography>
						<Typography className='toolbar-item'>
							Lists: {favoritesLists?.length}
						</Typography>
						<Typography className='toolbar-item'>
							IsAuth: {`${isAuthenticated}`}
						</Typography>
						<Typography className='toolbar-item color-primary'>
							{currentUser?.userName}
						</Typography>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}
