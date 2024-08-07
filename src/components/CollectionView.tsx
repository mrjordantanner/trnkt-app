import React, { useEffect, useState } from 'react';
import { Collection } from '../models/collection';
import { useAssetContext } from '../contexts/AssetContext';
import { useNftService } from '../contexts/NftServiceContext';
import { Box } from '@mui/material';
import Loading from './utils/Loading';
import CollectionCard from './CollectionCard';
import SectionHeader from './SectionHeader';
//import GemBagImage from '../images/Gem-Bag-1b.png';
import Gem from '../images/Gem-1.png';

// Main Explore screen consisting of a Sidebar and a Gallery
export default function CollectionView() {
	const [featuredCollections, setFeaturedCollections] = useState<
		Collection[] | null
	>(null);

	const {
		featuredCollectionSlugs,
		nextCollectionCursor,
		setNextCollectionCursor,
		collections,
		setCollections,
		setNfts,
	} = useAssetContext();

	const nftService = useNftService();

	useEffect(() => {
		setNfts(null);
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
	async function getCollectionBatch(): Promise<{
		collections: Collection[] | null;
		next: string | null;
	}> {
		const response = await nftService.fetchCollections(nextCollectionCursor);

		setCollections(response.collections);
		setNextCollectionCursor(response.next);
		return response;
	}

	if (!collections || !featuredCollections) {
		return <Loading />;
	}

	return (
		<Box className='full-height-minus-bars'>
			<Box className='container'>
				<SectionHeader title='Featured Collections' imgSrc={Gem} />

				<Box className='collection-container'>
					{!featuredCollections && <h2>No collections available</h2>}

					{featuredCollections.map((collection: Collection) => {
						return (
							<CollectionCard collection={collection} key={collection.name} />
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}
