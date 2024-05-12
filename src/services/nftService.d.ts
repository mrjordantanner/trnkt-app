declare module 'NftService' {
    interface AssetTrait {
      type: string;
      value: string;
    }
  
    interface AssetData {
      identifier: string;
      token_id: string;
      image_url: string;
      name?: string;
      description?: string;
      creator?: string;
      traits?: AssetTrait[];
    }
  
    export default class NftService {
      constructor(base?: string);
      getSingleAsset(contract: string, token: string): Promise<AssetData>;
      getAssets(): Promise<AssetData[]>;
      fetchRandomNFTs(): Promise<AssetData[]>;
    }
  }
  