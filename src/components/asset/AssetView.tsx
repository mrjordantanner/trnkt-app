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
import MediaComponent from '../MediaComponent';
//import Footer from '../Footer';

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

	//const imgPreviewSize = '120px';

	const descriptionStyle = {
		fontSize: '1rem',
		lineHeight: '1.25rem',
		color: 'lightgray',
		padding: '1rem',
		alignItems: 'left',
	};

	let openseaUrl = '';
	if (selectedCollection) {
		if (selectedAsset) {
			openseaUrl = selectedAsset.openseaUrl;
		} else {
			openseaUrl = selectedCollection.opensea_url;
		}
	}

	return (
	<Box className='full-height-minus-bars'>
		<Box className='asset-main-content'>
			<Box className='gallery asset-gallery'>
				<MediaComponent asset={assetInView} />
			</Box>

			{/* CONTENT */}
			<Box className='sidebar asset-sidebar'> 
			{/* <Box className='asset-content'> */}
				{/* TITLE & BUTTONS */}
				<Box className='asset-titlebar panel'>
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							padding: '5px',
							//border: '1px solid red'
						}}>
						<Box className='desktop-only'>
							<img className='asset-preview'
								src={
									assetInView.displayImageUrl
										? assetInView.displayImageUrl
										: assetInView.imageUrl
								}
								alt={assetInView.name}
							/>
						</Box>

						<Box className='asset-view-properties flex-column-center'>
							
							{/* ASSET NAME */}
							<Typography className='asset-view-title'>{assetInView.name}</Typography>

							{/* COLLECTION INFO */}
							<Box
								className='flex-center'
								sx={{ width: '100%' }}>
								
								<img
									src={selectedCollection?.image_url}
									alt={selectedCollection?.name}
									className='asset-view-collection-image'
								/>

								<Typography className='asset-view-collection-name'>
									{selectedCollection?.name}
								</Typography>

								{selectedAsset ? (
									<a
										className='link'
										href={openseaUrl}
										target='_blank'
										rel='noopener noreferrer'>
										View on Opensea.io
									</a>
								) : null}

								<Box className='desktop-only'>
									<ObjectViewer data={assetInView} />
									
								</Box>

								<SaveToFavoritesButton />

							</Box>
						</Box>
					</Box>
				</Box>

				{/* ASSET DESCRIPTION TEXT */}
				<Box className='asset-description panel'>
					<Typography className='panel-header'>
						Description
					</Typography>

					{assetInView.description != '' ? (
						<LinkifyText
							text={assetInView.description}
							style={descriptionStyle}
						/>
					) : (
						<Typography sx={{ p: 2 }}>No description.</Typography>
					)}
				</Box>

				<AssetTraits asset={assetInView} />
			</Box>

			{/* <Footer /> */}
		</Box>
		</Box>
	);
}
