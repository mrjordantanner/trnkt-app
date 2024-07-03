import React, { useEffect, useState } from 'react';
import { Collection } from '../models/collection';
import { useAssetContext } from '../contexts/AssetContext';
import { useNftService } from '../contexts/NftServiceContext';
import { Box, Typography } from '@mui/material';
import Loading from './utils/Loading';
import CollectionCard from './CollectionCard';

// Main Explore screen consisting of a Sidebar and a Gallery
export default function CollectionView() {

  const [featuredCollections, setFeaturedCollections] = useState<Collection[] | null>(null);

  const { 
    featuredCollectionSlugs,
    nextCollectionCursor, setNextCollectionCursor,
    collections, setCollections
  } = useAssetContext();

  const nftService = useNftService();

  useEffect(() => {
    if (!featuredCollections) {
      getFeaturedCollections();
    }
    //getCollectionBatch();
  }, []);  

  // Gets and sets featuredCollections
  async function getFeaturedCollections() {
    const collectionsList: Collection[] = [];
    for (const collectionSlug of featuredCollectionSlugs) {
      const response = await nftService.fetchCollection(collectionSlug);
      if (!response) continue;
      collectionsList.push(response);
    }
    setFeaturedCollections(collectionsList);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function getCollectionBatch(): Promise<{ collections: Collection[] | null, next: string | null }> {
    const response = await nftService.fetchCollections(nextCollectionCursor);

    setCollections(response.collections);
    setNextCollectionCursor(response.next)
    return response;
  }

  if (!collections || !featuredCollections) {
    return <Loading />
  }

  const containerStyle = {
    //marginTop: '70px',
    height: '90vh'
  }

  // const galleryStyle = {
  //   height: '100%',
  //   //display: 'flex',
  //   //flexDirection: 'column',
  //   alignItems: 'center',
  //   overflowY: 'scroll',
  // }

  return (
		<Box sx={containerStyle}>

      <Typography variant="h2" sx={{ padding: '10px' }}>Featured Collections</Typography>

			<Box className="collections-gallery">

				{!featuredCollections && <h2>No collections available</h2>}

				{featuredCollections.map((collection: Collection) => {
          //console.log(collection);
					return (
						<CollectionCard
							collection={collection}
							key={collection.collection}
						/>
					);
				})} 

			</Box>
		</Box>
	);
}
