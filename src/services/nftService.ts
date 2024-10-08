import axios, { AxiosRequestConfig } from 'axios';
import { NftModel } from '../models/nftModel';
import { NftDto } from '../models/nftDto';
import { Collection } from '../models/collection';

class NftService {
    private apiEndpoint: string;
    private baseUrl: string;
    private axiosOptions: AxiosRequestConfig;

    constructor() {
        this.apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        this.baseUrl = `${this.apiEndpoint}/api/nft`;
        this.axiosOptions = {
            headers: {
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin': 'http://localhost:5173',
            },
        };
    }

	async fetchNfts(
		collectionSlug: string,
		limit: number = 50,
		next: string | null = null
	): Promise<{ nfts: NftModel[]; next: string | null }> {
		const url = next
			? `${this.baseUrl}/fetchNfts/${collectionSlug}?limit=${limit}&next=${next}`
			: `${this.baseUrl}/fetchNfts/${collectionSlug}?limit=${limit}`;

		try {
			//console.log(`Fetching batch from Collection: ${collectionSlug}...`);
			const response = await axios.get(url, this.axiosOptions);
			const data = response.data;

			const nftModels: NftModel[] = [];
			if (data.nfts.length > 0) {
				data.nfts.forEach((nftDto: NftDto) => {
					if (nftDto.is_nsfw) return;  // TODO make the NSFW Filter optional in Settings
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
			console.error('Error fetching full NFT Data: Asset was null.')
			return null;
		}

		if (!assetToGet.openseaUrl) {
			console.error('Error fetching full NFT Data: Unable to determine Blockchain because Opensea URL was null.')
			return null;
		}

		const blockchain: string | '' = this.getBlockchainFromUrl(assetToGet.openseaUrl);

		if (!blockchain) {
			console.error(`Error: Couldn't determine Blockchain from asset data`);
			return null;
		}

		const url = `${this.baseUrl}/fetchNft/${blockchain}/${assetToGet.contract}/${assetToGet.identifier}`;

		try {
			console.log(`Fetching single NFT: ${assetToGet.collection}/${assetToGet.identifier}...`);
			const response = await axios.get(url, this.axiosOptions);
			const data = response.data;
			console.log(data.nft);

			const nftModel = this.mapDtoToModel(data.nft);
			if (nftModel) {
				return nftModel;
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
			//console.log(`Fetching Collection: ${collectionSlug}`);
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
			? `${this.baseUrl}/fetchCollections?next=${next}/`
			: `${this.baseUrl}/fetchCollections/`;

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
		const mappedModel = {
			identifier: dto.identifier ?? '',
			collection: dto.collection ?? '',
			contract: dto.contract ?? '',
			tokenStandard: dto.token_standard ?? '',
			name: dto.name ?? '',
			description: dto.description ?? '',
			imageUrl: dto.image_url ?? '',
			metadataUrl: dto.metadata_url ?? '',
			openseaUrl: dto.opensea_url ?? '',
			updatedAt: dto.updated_at ?? '',
			isDisabled: dto.is_disabled ?? false,
			isNsfw: dto.is_nsfw ?? false,
			animationUrl: dto.animation_url ?? '',
			displayAnimationUrl: dto.display_animation_url ?? '',
			displayImageUrl: dto.display_image_url ?? '',
			isSuspicious: dto.is_suspicious ?? false,
			creator: dto.creator ?? '',
			traits: dto.traits
				? dto.traits.map((trait) => ({
					traitType: trait.trait_type ?? '',
					displayType: trait.display_type ?? '',
					maxValue: trait.max_value ?? 0,
					value: trait.value ?? '',
				}))
				: [],
			owners: dto.owners
				? dto.owners.map((owner) => ({
					address: owner.address ?? '',
					quantity: owner.quantity ?? 0,
				}))
				: [],
			rarity: {
				strategyVersion: dto.rarity?.strategy_version ?? '',
				rank: dto.rarity?.rank ?? 0,
				score: dto.rarity?.score ?? 0,
				calculatedAt: dto.rarity?.calculated_at ?? '',
				maxRank: dto.rarity?.max_rank ?? 0,
				totalSupply: dto.rarity?.total_supply ?? 0,
				rankingFeatures: {
					uniqueAttributeCount: dto.rarity?.ranking_features?.unique_attribute_count ?? 0,
				},
			},
		};

		// console.log('DTO:', dto);
		// console.log('Mapped Model:', mappedModel);

		return mappedModel;

	}
	
}

export default NftService;
