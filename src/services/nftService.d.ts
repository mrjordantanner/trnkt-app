import { AssetData } from '../models/nft';

export module 'NftService' {
  export class NftService {
    constructor(base?: string);
    getSingleAsset(contract: string, token: string): Promise<AssetData>;
    getAssets(): Promise<AssetData[]>;
    fetchRandomNFTs(): Promise<AssetData[]>;
  }
}

export default NftService;
  