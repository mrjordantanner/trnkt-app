/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../models/collection';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
import { useNftService } from '../contexts/NftServiceContext';

interface Props {
  collection: Collection;
}



export default function CollectionCard({ collection }: Props) {

  const { setNfts, nfts, selectedCollection, setCollection, setSelectedAsset, nftLimit, nextNftCursor } = useAssetContext();
  const navigate = useNavigate();
  const nftService = useNftService();

  if (!collection || !collection.image_url) {
    return null;
  }

  const onClickCollection = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setCollection(collection);
    setSelectedAsset(null);
    const nftBatch = await nftService.fetchNfts(collection.collection, nftLimit, nextNftCursor);
    setNfts(nftBatch.nfts);
    navigate(`/nfts/collections/${collection.collection}`);
  };


  // function stripQueryParameters(url: string): string {
  //   const indexOfQuestionMark = url?.indexOf('?');
  //   if (indexOfQuestionMark === -1) {
  //       return url;
  //   }
  //   return url ? url.substring(0, indexOfQuestionMark) : '';
  // }

  const buttonBaseStyle = {
    position: 'absolute',
    opacity: '0.5',
  };

  const contentStyle = {
    position: 'relative', 
    zIndex: 2,
    width: '100%',
    padding: '8px',
    borderRadius: '20px',
  };
 
  return (
      <ButtonBase className="collection-card" onClick={onClickCollection}>

        <Box className="nft-image" 
          style={{ backgroundImage: 
          `url(${collection.image_url})`
          }}>

          <Box className="nft-name text-bold">{collection.name}</Box>
        </Box>

      </ButtonBase>

	);
}
