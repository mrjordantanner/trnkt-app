/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NftModel } from '../../models/nftModel';
import { Box, ButtonBase, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useAssetContext } from '../../contexts/AssetContext';
import { useNftService } from '../../contexts/NftServiceContext';
import ObjectViewer from '../utils/ObjectViewer';

interface Props {
  asset: NftModel;
}

export default function FavoriteCard({ asset }: Props) {
  const navigate = useNavigate();
  const { selectedAsset, setSelectedAsset } = useAssetContext();
  const nftService = useNftService();
  if (!asset) {
    return null;
  }

  const onClickAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedAsset(asset);
    nftService.fetchNft(asset);
	navigate(`/nfts/${asset.collection}/${asset.identifier}`);
  };


  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
	event.stopPropagation();
	console.log(`TODO: Remove NFT: ${event.target} from List`);
  };
  
  return (
		<Box>
			<ButtonBase
				className='favorite-card'
				onClick={onClickAsset}
				// onContextMenu={handleRightClick}
			>
				<Box className='gradient-loading-animation'></Box>

				<Box
					className='nft-image'
					style={{
						backgroundImage: `url(${
							asset.displayImageUrl ? asset.displayImageUrl : asset.imageUrl
						})`,
					}}>
					<Box className='nft-name'>
						{asset.name}
					</Box>

				<Box sx={{ width: '100%', display: 'flex', position: 'absolute', bottom: '0px', justifyContent: 'flex-end' }}>
					<IconButton sx={{ opacity: '0.75', zIndex: '100',  }}
					onClick={handleRemove} aria-label='remove'>
						<DeleteIcon className='icon' />
					</IconButton>
				</Box>
		

				</Box>


				
			</ButtonBase>




		</Box>
	);
}