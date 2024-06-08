import React, { useEffect, useState } from 'react';
import { Collection } from '../models/collection';
import { useAssetContext } from '../contexts/AssetContext';
import { Box } from '@mui/material';
import Loading from './Loading';
import CollectionCard from './CollectionCard';

const featuredCollectionSlugs: string[] = [
  'parallel-on-base',
  'new-dimension-huemin',
  'clonex',
  'daily-xyz',
  'byopill'
];

// Main Explore screen consisting of a Sidebar and a Gallery
export default function CollectionView() {

  const [featuredCollections, setFeaturedCollections] = useState<Collection[] | null>(null);

  const { 
    fetchCollection,
    fetchCollections, 
    nextCollectionCursor, setNextCollectionCursor,
    collections, setCollections
  } = useAssetContext();

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
      const response = await fetchCollection(collectionSlug);
      if (!response) continue;
      collectionsList.push(response);
    }
    setFeaturedCollections(collectionsList);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function getCollectionBatch(): Promise<{ collections: Collection[] | null, next: string | null }> {
    const response = await fetchCollections(nextCollectionCursor);

    setCollections(response.collections);
    setNextCollectionCursor(response.next)
    return response;
  }

  if (!collections || !featuredCollections) {
    return <Loading />
  }

  const containerStyle = {
    marginTop: '70px',
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

      <h2>Featured Collections</h2>

			<Box className="collections-gallery">

				{!featuredCollections && <h2>No collections available</h2>}

				{featuredCollections.map((collection: Collection) => {
          console.log(collection);
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
