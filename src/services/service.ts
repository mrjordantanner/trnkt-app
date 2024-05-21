import { API_KEY } from '../../config.json';
import { Nft } from '../models/nft';

const baseUrl = 'https://api.opensea.io/api/v2';

class NftService {

  async fetchNfts(collectionSlug: string) : Promise<Nft[]> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': API_KEY
      }
    };

    try {
      const response = await fetch(`${baseUrl}/collection/${collectionSlug}/nfts`, options);
      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      console.error(error);
      return Promise.resolve([]); 
    }
  }

  async fetchNft(id: string | undefined, address: string | undefined, chain: string | undefined) : Promise<Nft | null> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': API_KEY
      }
    };

    try {
      const response = await fetch(`${baseUrl}/chain/${chain}/contract/${address}/nfts/${id}`, options);
      const data = await response.json();
      console.log(data);
      return data;
      
    } catch (error) {
      console.error(error);
      return Promise.resolve(null); 
    }

  }


}

export default NftService;
