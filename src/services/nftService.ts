import axios, { AxiosRequestConfig } from 'axios';
import { NftModel } from '../models/nftModel';
import { NftDto } from '../models/nftDto';
import { Collection } from '../models/collection';
import config from '../../config.json';

class NftService {
	apiEndpoint = config.API_URL || 'http://localhost:5000/api';
	private baseUrl = `${this.apiEndpoint}/api/nft`;
	axiosOptions: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
	};

	async fetchNfts(
		collectionSlug: string,
		limit: number = 50,
		next: string | null = null
	): Promise<{ nfts: NftModel[]; next: string | null }> {
		const url = next
			? `${this.baseUrl}/fetchNfts/${collectionSlug}?limit=${limit}&next=${next}`
			: `${this.baseUrl}/fetchNfts/${collectionSlug}?limit=${limit}`;

		try {
			console.log(`Fetching batch from Collection: ${collectionSlug}...`);
			const response = await axios.get(url, this.axiosOptions);
			const data = response.data;

			const nftModels: NftModel[] = [];
			if (data.nfts.length > 0) {
				data.nfts.forEach((nftDto: NftDto) => {
					const nftModel = this.mapDtoToModel(nftDto);
					if (nftModel) {
						nftModels.push(nftModel);
					} else {
						console.error('Error mapping NftDto to NftModel');
					}
				});

				data.nfts = nftModels;
			}

			return data;
		} catch (error) {
			console.error(error);
			return { nfts: [], next: null };
		}
	}

	async fetchNft(assetToGet: NftModel | null): Promise<NftModel | null> {
		if (!assetToGet) {
			return null;
		}
		const blockchain: string | '' = this.getBlockchainFromUrl(
			assetToGet.openseaUrl
		);
		if (!blockchain) {
			console.error(`Error: Couldn't determine Blockchain from asset data`);
			return null;
		}

		const url = `${this.baseUrl}/fetchNft/${blockchain}/${assetToGet.contract}/${assetToGet.identifier}`;

		try {
			console.log(
				`Fetching single NFT, Chain/Id: ${blockchain}/${assetToGet.identifier}...`
			);
			const response = await axios.get(url, this.axiosOptions);
			const data = response.data;
			console.log(data.nft);

			const nftModel = this.mapDtoToModel(data.nft);
			if (nftModel) {
				return data.nft;
			} else {
				console.error('Error mapping NFT Dto to Model');
				return null;
			}
		} catch (error) {
			console.error(error);
			return Promise.resolve(null);
		}
	}

	async fetchCollection(collectionSlug: string): Promise<Collection | null> {
		const url = `${this.baseUrl}/fetchCollection/${collectionSlug}`;

		try {
			//console.log(`Fetching Collection {collectionSlug}...`, collectionSlug);
			const response = await axios.get(url, this.axiosOptions);
			const data = response.data;
			return data;
		} catch (error) {
			console.error(error);
			return Promise.resolve(null);
		}
	}

	async fetchCollections(
		next: string | null = null
	): Promise<{ collections: Collection[]; next: string | null }> {
		const url = next
			? `${this.baseUrl}/fetchCollections?next=${next}`
			: `${this.baseUrl}/fetchCollections`;

		try {
			console.log(`Fetching batch of Collections...`);
			const response = await axios.get(url, this.axiosOptions);
			const data = response.data;
			return data;
		} catch (error) {
			console.error(error);
			return { collections: [], next: null };
		}
	}

	async fetchRandomNftBatch(
		collectionSlugs: string[],
		nftLimit: number = 50
	): Promise<{ nfts: NftModel[]; next: string | null }> {
		let allNFTs: NftModel[] = [];

		for (const collection of collectionSlugs) {
			const response = await this.fetchNfts(collection);
			allNFTs = allNFTs.concat(response.nfts);
		}

		// Shuffle the array
		for (let i = allNFTs.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[allNFTs[i], allNFTs[j]] = [allNFTs[j], allNFTs[i]];
		}

		const randomNfts = allNFTs.slice(0, nftLimit);
		return { nfts: randomNfts, next: '' };
	}

	getBlockchainFromUrl = (url: string): string | '' => {
		try {
			const parsedUrl = new URL(url);
			const pathname = parsedUrl.pathname;
			const segments = pathname.split('/');
			const assetsIndex = segments.indexOf('assets');

			// Check if 'assets' is found and it has a segment after it
			if (assetsIndex !== -1 && assetsIndex + 1 < segments.length) {
				return segments[assetsIndex + 1];
			}
			return '';
		} catch (error) {
			console.error('Failed to get Blockchain from URL -- Invalid URL:', error);
			return '';
		}
	};

	mapDtoToModel(dto: NftDto): NftModel {
		return {
			identifier: dto.identifier,
			collection: dto.collection,
			contract: dto.contract,
			tokenStandard: dto.token_standard,
			name: dto.name,
			description: dto.description,
			imageUrl: dto.image_url,
			metadataUrl: dto.metadata_url,
			openseaUrl: dto.opensea_url,
			updatedAt: dto.updated_at,
			isDisabled: dto.is_disabled,
			isNsfw: dto.is_nsfw,
			animationUrl: dto.animation_url,
			displayAnimationUrl: dto.display_animation_url,
			displayImageUrl: dto.display_image_url,
			isSuspicious: dto.is_suspicious,
			creator: dto.creator,
			traits: dto.traits
				? dto.traits.map((trait) => ({
						traitType: trait.trait_type,
						displayType: trait.display_type,
						maxValue: trait.max_value,
						value: trait.value,
                 }))
				: [],
			owners: dto.owners
				? dto.owners.map((owner) => ({
						address: owner.address,
						quantity: owner.quantity,
                 }))
				: [],
			rarity: {
				strategyVersion: dto.rarity?.strategy_version,
				rank: dto.rarity?.rank,
				score: dto.rarity?.score,
				calculatedAt: dto.rarity?.calculated_at,
				maxRank: dto.rarity?.max_rank,
				totalSupply: dto.rarity?.total_supply,
				rankingFeatures: {
					uniqueAttributeCount:
						dto.rarity?.ranking_features?.unique_attribute_count,
				},
			},
		};
	}
}

export default NftService;
