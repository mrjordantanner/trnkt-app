import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { Link as RouterLink } from 'react-router-dom';
import { useAssetContext } from '../contexts/AssetContext';
import { useSettingsContext } from '../contexts/SettingsContext';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import MediaSettings from './MediaSettings';
import DevTools from './utils/DevTools';

export default function Toolbar() {
	const {
		nftLimit,
		selectedAsset,
		selectedCollection,
		featuredCollectionSlugs,
		//nextNftCursor,
		//setNextNftCursor,
		setNftLimit,
		setNfts,
		getNftBatch,
		getRandomBatch
	} = useAssetContext();

	const { shouldGetRandom, setShouldGetRandom } = useSettingsContext();

	useEffect(() => {
		fetchNfts();
	}, []);

	async function fetchNfts() {
		setNfts(null);
		if (shouldGetRandom) {
			await getRandomBatch(featuredCollectionSlugs, nftLimit);
		} else if (selectedCollection && !shouldGetRandom) {
			await getNftBatch(); 
		}
	}

	const handleRandomCheckboxChange = () => {
        setShouldGetRandom(!shouldGetRandom);
    };

	const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);
		setNftLimit(value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === 'NumpadEnter') {
			onButtonClick();
		}
	};

    const onButtonClick = () => {
			if (nftLimit <= 0 && nftLimit > 200) {
				setNftLimit(50);
				return;
			}
			fetchNfts();
		};

	return (
		<>
			<Box className='toolbar color-panel'>
				{selectedAsset && <MediaSettings />}

				{!selectedAsset && (
					<Box className='controls-container'>
						<Typography className='toolbar-label desktop-only'>
							Results per page <i>(1-200)</i>
						</Typography>

						{/* <Typography className='toolbar-label mobile-only'>
							Limit
						</Typography> */}

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

							<FormControlLabel
								sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
								control={
									<Checkbox 
										sx= {{ p: 2 }}
										className='checkbox'
										checked={shouldGetRandom}
										onChange={handleRandomCheckboxChange}
									/>
								}
								label=''
							/>
							<Typography className='toolbar-label'>Randomize</Typography>
						</Box>
					</Box>
				)}

				<DevTools />
			</Box>
		</>
	);
} 
