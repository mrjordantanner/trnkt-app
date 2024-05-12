import Asset from '../models/asset';
import fetch from 'node-fetch';
import { API_KEY } from '../../config.json';

const defaultUrl = 'https://api.opensea.io/api/v2';
const collectionSlug = 'parallel-on-base';

export class NftService {
  constructor(base = defaultUrl) {
    this.urlBase = base;
  }

  async getSingleAsset(contract, token) {
    const url = `${this.urlBase}/asset/${contract}/${token}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "X-API-KEY": API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch asset');
      }

      const data = await response.json();
      return new Asset(data);
    } catch (error) {
      console.error('Error fetching asset:', error);
      return `Error: ${error}`;
    }
  }

  async getAssets() {
    try {
      const response = await fetch(
        `${this.urlBase}/collection/${collectionSlug}/nfts?limit=50&next=`, {
          headers: {
            "X-API-KEY": API_KEY
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }

      const data = await response.json();
      console.log(data.nfts);
      return data.nfts;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async fetchRandomNFTs() {
    try {
      const response = await fetch(`${this.urlBase}/collection/${collectionSlug}/nfts?limit=50&next=`, {
        headers: {
          'accept': 'application/json',
          "X-API-KEY": API_KEY
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }
      const data = await response.json();
      return data.orders; // Assuming that 'orders' contains NFT data
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }
}

export default NftService;
