import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useAssetContext } from '../contexts/AssetContext';
import LinkifyText from './text/LinkifyText';
import CollectionDropdown from './CollectionDropdown';
import { SelectChangeEvent } from '@mui/material';
import { Collection } from '../models/collection';

export default function ExploreSidebar() {

  const { 
    setCollection,
    selectedCollection,
    featuredCollectionSlugs,
    collectionMenuOptions,
    setCollectionMenuOptions,
    getLocalCollectionBySlug,
    getNftBatch,
    setNfts
  } = useAssetContext();

  // Creates dropdown menu options from the Featured Collection slugs
  useEffect(() => {
    if (featuredCollectionSlugs) {
      const options = featuredCollectionSlugs.map(slug => ({
        label: getLocalCollectionBySlug(slug)?.name ?? slug,
        value: slug
      }));
      setCollectionMenuOptions(options);
    }
  }, [featuredCollectionSlugs]);

  // Handle the change in the selected collection
  const handleCollectionChange = (event: SelectChangeEvent<string>, newValue: string | null) => {
    if (newValue) {
      const collection : Collection | undefined = getLocalCollectionBySlug(newValue);
      if (collection) {
        setNfts(null);
        setCollection(collection);
        getNftBatch();
      }
    } 
  };

  // Get the current menu option based on the selected collection
  const getMenuOption = (): string | undefined => {
    return selectedCollection?.collection || undefined;
  };

  return (
    <Box className='sidebar explore-sidebar'>

      <Typography className='desktop-only'
        sx={{ fontSize: '1.75rem', width: '100%', p: 2, fontWeight: 'bold' }}>
        C O L L E C T I O N
      </Typography>

      <Box className='collection-dropdown-container'>
        <CollectionDropdown 
          handleCollectionChange={handleCollectionChange}
          getMenuOption={getMenuOption}
          options={collectionMenuOptions}
        />
      </Box>

      {/* COLLECTION INFO */}
      <Box className="description-container panel">

        <Box sx={{ width: '100%', p: 1 }}>
          <Typography className='collection-name-text'>{selectedCollection?.name}</Typography>
        </Box>

        {selectedCollection && 
          <LinkifyText style={{ marginTop: '1rem', fontWeight: '500' }} text={selectedCollection.description}></LinkifyText>}

      </Box>  
    </Box>
  );
}
