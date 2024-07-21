import React, { useEffect, useState } from 'react';
import { useAssetContext } from '../../contexts/AssetContext';
import { NftModel } from '../../models/nftModel';
import { Box, Typography } from '@mui/material';
import AssetTraits from './AssetTraits';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import Loading from '../utils/Loading';
import LinkifyText from '../text/LinkifyText';
import ObjectViewer from '../utils/ObjectViewer';
import { useNftService } from '../../contexts/NftServiceContext';

export default function AssetView() {
	const { selectedAsset, selectedCollection } = useAssetContext();
	const [assetInView, setAssetInView] = useState<NftModel | null>(null);

	const nftService = useNftService();

	useEffect(() => {
		getSelectedAssetDetails();
	}, []);

	async function getSelectedAssetDetails(): Promise<NftModel | null> {
		const asset = await nftService.fetchNft(selectedAsset);
		setAssetInView(asset);
		return asset;
	}

	if (!assetInView) {
		return <Loading />;
	}

	const imgPreviewSize = '50px';

	const descriptionStyle = {
		fontSize: '1.25rem',
		lineHeight: '1.5rem',
		color: 'lightgray',
		padding: '1rem',
		width: '100%',
		alignItems: 'left',
		//border: '1px solid gray'
	};

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		border: '1px solid cyan',
		//bgcolor: 'red'
	};

	const imageStyle = {
		display: 'flex',
		width: '100%',
		height: '80vh',
		padding: '10px',
		alignItems: 'center',
		justifyContent: 'center',
		objectFit: 'contain',
		//bgcolor: 'violet'
	};

	const nameStyle = {
		width: '100%',
		height: imgPreviewSize,
		fontSize: '2rem',
		fontWeight: 'bold',
		padding: '10px',
		//bgcolor: 'cyan'
	};

	return (
		<Box className='scrollbar full-height-plus-navbar' sx={containerStyle}>
			<Box sx={imageStyle}>
				{assetInView.animationUrl ? (
					<video
						src={assetInView.animationUrl}
						autoPlay
						loop
						muted
						controls
						className='height-80-minus-navbar'
						style={{ height: '100%' }}>
						Sorry, the video can't play in this browser.
					</video>
				) : (
					<img
						src={assetInView.imageUrl}
						alt={assetInView.name}
						className='height-80-minus-navbar'
						style={{ objectFit: 'contain' }}
					/>
				)}
			</Box>

			<Box className='asset-properties'>
				<Box
					sx={{
						//bgcolor: 'red',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '10px',
					}}>
					<img
						src={assetInView.imageUrl}
						alt={assetInView.name}
						style={{
							height: imgPreviewSize,
							width: imgPreviewSize,
							objectFit: 'cover',
						}}
					/>

					<Typography style={nameStyle}>{assetInView.name}</Typography>
					<ObjectViewer data={assetInView} />
					<SaveToFavoritesButton />
				</Box>
			</Box>

			<Box
				sx={{
					//bgcolor: 'blue',
					height: imgPreviewSize,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					padding: '30px 10px 10px 45px',
				}}>
				<img
					src={selectedCollection?.image_url}
					alt={selectedCollection?.name}
					style={{
						height: '50px',
						width: '50px',
						objectFit: 'cover',
						borderRadius: '50%',
					}}
				/>

				<Typography
					style={{
						width: '100%',
						height: '50px',
						fontSize: '1.25rem',
						fontWeight: 'bold',
						color: 'lightgray',
						padding: '10px 10px',
					}}>
					{selectedCollection?.name}
				</Typography>
			</Box>

			<Box
				sx={{
					marginTop: '30px',
					//backgroundColor: '#231222'
				}}>
				<LinkifyText text={assetInView.description} style={descriptionStyle} />
			</Box>

			{/* <Box className='property-list'> */}
			<AssetTraits asset={assetInView} />
			{/* </Box> */}
		</Box>
	);
}
