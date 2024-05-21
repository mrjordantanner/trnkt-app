// Define the trait interface
export interface Trait {
  trait_type: string;
  display_type: string;
  max_value: string;
  value: number;
}

// Define the owner interface
export interface Owner {
  address: string;
  quantity: number;
}

// Define the rarity interface
export interface Rarity {
  strategy_version: string;
  rank: number;
  score: number;
  calculated_at: string;
  max_rank: number;
  total_supply: number;
  ranking_features: {
    unique_attribute_count: number;
  };
}

// Define the NftData interface
export interface Nft {
  id: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  animation_url: string;
  is_suspicious: boolean;
  creator: string;
  traits: Trait[];
  owners: Owner[];
  rarity: Rarity;
}

// // Define the Nft type using the NftData interface
// export type Nft = {
//   nft: NftData;
// };