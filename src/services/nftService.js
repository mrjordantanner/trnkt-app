//import { mapDataToAsset } from '../models/nft';
import { API_KEY } from '../../config.json';

// NFT url anatomy
// https://api.opensea.io/api/v2/chain/amoy/contract/address/nfts/identifier

const baseUrl = 'https://api.opensea.io/api/v2';


class NftService {
  // constructor(base = defaultUrl) {
  //   this.urlBase = base;
  // }


  // async fetchNFT(chain, address, id) {
  //   const options = {method: 'GET', headers: {accept: 'application/json','X-API-KEY': API_KEY}};

  //   const response = await fetch(`${baseUrl}/chain/${chain}/contract/${address}/nfts/${id}`, options)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch asset'); // TODO Handle failed GET requests better
  //     }
  // }

  async fetchNFTs(collectionSlug) {
    const options = {method: 'GET', headers: {accept: 'application/json','X-API-KEY': API_KEY}};
    console.log('Service:');
    const response = await fetch(`${baseUrl}/collection/${collectionSlug}/nfts`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

      return response;
  }

  // async getSingleAsset(contract, token) {
  //   const url = `${baseUrl}/asset/${contract}/${token}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         "X-API-KEY": API_KEY
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch asset'); // TODO Handle failed GET requests better
  //     }

  //     const data = await response.json();
  //     console.log(`API: GetSingleAsset: ${data}`)
  //     return mapDataToAsset(data);

  //   } catch (error) {
  //     console.error('Error fetching asset:', error);
  //     return `Error: ${error}`;
  //   }
  // }

  // async getAssets(collectionSlug) {
  //   try {
  //     const response = await fetch(`${baseUrl}/collection/${collectionSlug}/nfts?limit=50&next=`, {
  //         headers: {
  //           "X-API-KEY": API_KEY
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch NFTs'); // TODO Handle failed GET requests better
  //     }

  //     const data = await response.json();
  //     console.log(`API: GetAssets: ${data.nfts}`)
  //     return data.nfts.map(assetData => mapDataToAsset(assetData));

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return [];
  //   }
  // }

  // TODO work on getting randomized content back from the API

  // async fetchRandomNFTs() {
  //   try {
  //     const response = await fetch(`${this.urlBase}/collection/${collectionSlug}/nfts?limit=50&next=`, {
  //       headers: {
  //         'accept': 'application/json',
  //         "X-API-KEY": API_KEY
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch NFTs');
  //     }
  //     const data = await response.json();
  //     return data.orders; // Assuming that 'orders' contains NFT data
  //   } catch (error) {
  //     console.error('Error fetching NFTs:', error);
  //     return [];
  //   }
  // }
}

export default NftService;
