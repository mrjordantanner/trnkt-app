export interface Trait {
  trait_type: string;
  display_type: string;
  max_value: string;
  value: number;
}

export interface Owner {
  address: string;
  quantity: number;
}

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

export interface Nft {
  identifier: string;
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
