import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { Link as RouterLink } from 'react-router-dom';
import { useAssetContext } from '../contexts/AssetContext';
import { useNftService } from '../contexts/NftServiceContext';

import { NftModel } from '../models/nftModel';
import {
	Box,
	Button,
	//TextField,
	//IconButton,
	//List,
	//ListItem,
} from '@mui/material';
// import { useUserService } from '../contexts/UserServiceContext';
// import { useFavoritesContext } from '../contexts/FavoritesServiceContext';
import MediaSettings from './MediaSettings';
import DevTools from './utils/DevTools';
//import { Home as HomeIcon } from '@mui/icons-material';

export default function Toolbar() {

	const {
		nftLimit,
		selectedAsset,
		selectedCollection,
		nextNftCursor,
		setNextNftCursor,
		setNftLimit,
		setNfts,
	} = useAssetContext();

	// //const navigate = useNavigate();
	// const { isAuthenticated, currentUser } = useUserService();
	// const { favoritesLists } = useFavoritesContext();

	// const onClickCollections = () => {
	// 	setSelectedAsset(null);
	// 	setCollection(null);
	// };

	useEffect(() => {
		setNfts(null);
		getNftBatch();
	}, []); // selectedCollection

	const nftService = useNftService();

	async function getNftBatch(): Promise<{
		nfts: NftModel[];
		next: string | null;
	}> {
		if (!selectedCollection) {
			return { nfts: [], next: null };
		}
		const response = await nftService.fetchNfts(
			selectedCollection.collection,
			nftLimit,
			nextNftCursor
		);
		console.log(response);
		setNfts(response.nfts);
		setNextNftCursor(response.next);
		return response;
	}

	const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);
		setNftLimit(value);
		// if (value >= 1 && value <= 200) {
		// 	setNftLimit(value);
		// }
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === 'NumpadEnter') {
			onButtonClick();
		}
	};

    const onButtonClick = () => {
			if (selectedCollection) {
				setNfts(null);
				getNftBatch();
			}
		};

	return (
		<>
			<Box className='toolbar color-panel'>

			{selectedAsset && <MediaSettings />}

			{(selectedCollection && !selectedAsset) &&
				<Box className='controls-container'>
					<p>
						Results per page <i>(1-200)</i>
					</p>

					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<input
							className='toolbar-input-field'
							type='number'
							value={nftLimit}
							onChange={handleLimitChange}
							onKeyDown={handleKeyDown}
							// inputProps={{ min: 1, max: 200, default: 50 }}
						/>

						<Button
							variant='contained'
							className='toolbar-button button'
							onClick={onButtonClick}>
							Get NFTs
						</Button>
					</Box>
				</Box>}

				<DevTools />

			</Box>
		</>
	);
}
