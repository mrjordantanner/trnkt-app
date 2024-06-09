/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../models/collection';
import { Box, Card, CardContent, ButtonBase, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';

interface Props {
  collection: Collection;

}

export default function CollectionCard({ collection }: Props) {

  const { selectedCollection, setCollection, setSelectedAsset, fetchNfts, nftLimit, nextNftCursor } = useAssetContext();
  const navigate = useNavigate();

  if (!collection || !collection.image_url) {
    return null;
  }

  const onClickCollection = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCollection(collection);
    setSelectedAsset(null);
    fetchNfts(collection.collection, nftLimit, nextNftCursor);
    navigate('/explore');
  };

  function stripQueryParameters(url: string): string {
    const indexOfQuestionMark = url?.indexOf('?');
    if (indexOfQuestionMark === -1) {
        return url; // Return the original URL if no query parameters are found
    }
    
    return url ? url.substring(0, indexOfQuestionMark) : '';
  }

  const cardStyle = {
    display: 'flex', 
    width: "100%", 
    height: '400px', 
    margin: '16px', 
    borderRadius: '20px',
  }  

  const buttonBaseStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
  };

  const contentStyle = {
    position: 'relative', 
    zIndex: 2,
    width: '100%',
    border: '2px solid blue',
    padding: '8px',
    borderRadius: '20px',
  };
 
  return (
    <Card sx={{ ...cardStyle, position: 'relative' }}>
      <ButtonBase onClick={onClickCollection} sx={buttonBaseStyle} />
      <CardContent sx={contentStyle}>
        <Typography sx={{ color: 'black' }}>
          {collection ? collection.name : 'Undefined'}
        </Typography>
        <img
          src={stripQueryParameters(collection.image_url)}
          alt={collection.name}
          style={{ width: '100%', objectFit: 'cover', borderRadius: '20px' }}
        />
      </CardContent>
    </Card>

	);
}
