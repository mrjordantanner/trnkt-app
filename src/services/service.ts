import { Nft } from '../models/nft';

class NftService {
  private baseUrl = 'http://localhost:5000/api/nft';

  async fetchNfts(collectionSlug: string): Promise<Nft[] | null> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };

    try {
      console.log(`Fetching batch from Collection: ${collectionSlug}...`);
      const response = await fetch(`${this.baseUrl}/fetchNfts/${collectionSlug}`, options);
      
      if (!response.ok) {
        console.error(`Error fetching NFTs: ${response.statusText}`);
        return null;
      }

      // const data = await response.json();
      // console.log("Response data:", data);

      const textData = await response.text(); // Get the response as text

      const data = JSON.parse(textData); // Parse the JSON string manually
      console.log(data);

      if (data && Array.isArray(data.nfts)) {
        return data.nfts as Nft[];
      } else {
        console.error("Unexpected response structure");
        return null;
      }

    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  async fetchNft(assetToGet: Nft | null): Promise<Nft | null> {

    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };

    if (!assetToGet) { return null; }

    const blockchain : string | '' = this.getBlockchainFromUrl(assetToGet.opensea_url);
  
    if (!blockchain) {
      console.error(`Error: Couldn't determine Blockchain from asset data`);
      return null;
    }

    const url = `${this.baseUrl}/fetchNft/${blockchain}/${assetToGet.contract}/${assetToGet.identifier}`;

    try {
      console.log(`Fetching single NFT, Chain/Id: ${blockchain}/${assetToGet.identifier}...`);
      const response = await fetch(url, options);
      const data = await response.json();
      return data.nft;

    } catch (error) {
      console.error(error);
      return Promise.resolve(null);
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
