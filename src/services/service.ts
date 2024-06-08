import { Nft } from '../models/nft';
import { Collection } from '../models/collection';

class NftService {
  private baseUrl = 'http://localhost:5000/api/nft';
  getRequestOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  async fetchNfts(collectionSlug: string, limit: number = 50, next: string | null = null): Promise<{ nfts: Nft[], next: string | null }> {

    const url = next ? 
      `${this.baseUrl}/fetchNfts/${collectionSlug}?limit=${limit}&next=${next}` : 
      `${this.baseUrl}/fetchNfts/${collectionSlug}?limit=${limit}`;

		try {
			console.log(`Fetching batch from Collection: ${collectionSlug}...`);
			const response = await fetch(url, this.getRequestOptions);
			const data = await response.json();
			return data;

		} catch (error) {
			console.error(error);
			return { nfts: [], next: null };
		}
	}

  async fetchNft(assetToGet: Nft | null): Promise<Nft | null> {
    if (!assetToGet) { return null; }
    const blockchain : string | '' = this.getBlockchainFromUrl(assetToGet.opensea_url);
    if (!blockchain) {
      console.error(`Error: Couldn't determine Blockchain from asset data`);
      return null;
    }

    const url = `${this.baseUrl}/fetchNft/${blockchain}/${assetToGet.contract}/${assetToGet.identifier}`;

    try {
      console.log(`Fetching single NFT, Chain/Id: ${blockchain}/${assetToGet.identifier}...`);
      const response = await fetch(url, this.getRequestOptions);
      const data = await response.json();
      console.log(data.nft);
      return data.nft;

    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
    }
  }

  async fetchCollection(collectionSlug: string ): Promise<Collection | null> {
    const url = `${this.baseUrl}/fetchCollection/${collectionSlug}`

    try {
      console.log(`Fetching Collection {collectionSlug}...`, collectionSlug);
      const response = await fetch(url, this.getRequestOptions);
			const data = await response.json();
			return data;

    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
    }
  }

  async fetchCollections(next: string | null = null): Promise<{ collections: Collection[], next: string | null }> {
    const url = next ? 
    `${this.baseUrl}/fetchCollections?next=${next}` : 
    `${this.baseUrl}/fetchCollections`;

    try {
      console.log(`Fetching batch of Collections...`);
      const response = await fetch(url, this.getRequestOptions);
			const data = await response.json();
			return data;

    } catch (error) {
      console.error(error);
      return { collections: [], next: null };
    }
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
}

export default NftService;
