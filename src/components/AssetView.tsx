import React, { useEffect, useState } from 'react';
import { useAssetContext } from '../contexts/AssetContext';
import { Nft } from '../models/nft';
import { Box, Typography, Link, Button } from '@mui/material';
import AssetTraits from './assetProperties/AssetTraits';
import FavoritesToggleButton from './assetProperties/FavoritesToggleButton';
import Loading from './Loading';
import LinkifyText from './LinkifyText';

interface Props {
  addToFavorites: (asset: Nft) => void;
  removeFromFavorites: (asset: Nft) => void;
  localFavorites: Nft[] | null;
}

export default function AssetView({ addToFavorites, removeFromFavorites, localFavorites }: Props) {

  const { selectedAsset, selectedCollection, fetchNft, setSelectedAsset } = useAssetContext();
  const [assetInView, setAssetInView] = useState<Nft | null>(null);

  useEffect(() => {
    getSelectedAssetDetails();
  }, []);

  async function getSelectedAssetDetails(): Promise<Nft | null> {
    const asset = await fetchNft(selectedAsset);
    setAssetInView(asset);
    return asset;
  }

  const onClearAsset = () => {
    setSelectedAsset(null);
  }

  if (!assetInView) {
    return <Loading />;
  }

  const descriptionStyle = {
    fontSize : '1.25rem',
    lineHeight: '1.5rem',
    color: 'lightgray',
    padding: '1rem',
    width: '100%',
    alignItems: 'left',
    //border: '1px solid gray'
  }

  const toolbarStyle = {
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '50px', width: '100%', border: '1px solid black', margin: '10px', borderRadius: '8px', backgroundColor: '#343434'
  }

  const buttonStyle = {
    display: 'fixed',
    position: 'absolute',
    top: '80px',
    border: "1px solid white",
    backgroundColor: "#353535",
    color: "white",
    margin: '10px',
    width: '120px',
    opacity: '0.5'
  }
  

  return (
		<Box className='asset-view-container'>
			<Button sx={buttonStyle} onClick={onClearAsset}>
				BACK
			</Button>
			<Box className='asset-view-image'>
				{assetInView.animation_url ? (
					<video
						src={assetInView.animation_url}
						autoPlay
						loop
						muted
						controls
						style={{}}>
						Sorry, the video can't play in this browser.
					</video>
				) : (
					<img
						src={assetInView.image_url}
						alt={assetInView.name}
						style={{
							width: '100%',
							objectFit: 'contain',
						}}
					/>
				)}
			</Box>

			<Box className='asset-properties'>
				<Typography className='name'>{assetInView.name}</Typography>
				<h2>{selectedCollection?.name}</h2>

				<Box sx={toolbarStyle}>
					<Link
						className='detail-text'
						href={assetInView.opensea_url}
						sx={{ color: 'cyan' }}
						target='_blank'
						rel='noopener noreferrer'>
						View on Opensea.io
					</Link>

					<FavoritesToggleButton
						asset={assetInView}
						localFavorites={localFavorites}
						addToFavorites={addToFavorites}
						removeFromFavorites={removeFromFavorites}
					/>
				</Box>

				<Box
					sx={{
						marginTop: '30px',
						//backgroundColor: '#231222'
					}}>
					<LinkifyText
						text={assetInView.description}
						style={descriptionStyle}
					/>
				</Box>

				<Box className='property-list'>
					<AssetTraits asset={assetInView} />
				</Box>
			</Box>
		</Box>
	);
}
