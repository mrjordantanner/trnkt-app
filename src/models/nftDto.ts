export interface Trait {
  traitType: string;
  displayType: string;
  maxValue: string;
  value: number;
}

export interface Owner {
  address: string;
  quantity: number;
}

export interface Rarity {
  strategyVersion: string;
  rank: number;
  score: number;
  calculatedAt: string;
  maxRank: number;
  totalSupply: number;
  rankingFeatures: {
    unique_attribute_count: number;
  };
}

export interface NftDto {
  identifier: string;
  collection: string;
  contract: string;
  tokenStandard: string;
  name: string;
  description: string;
  imageUrl: string;
  metadataUrl: string;
  openseaUrl: string;
  updatedAt: string;
  isDisabled: boolean;
  isNsfw: boolean;

  // These fields are only returned when getting single NFTs, not as a batch
  animationUrl: string;
  displayAnimationUrl: string;
  displayImageUrl: string;
  isSuspicious: boolean;
  creator: string;
  traits: Trait[];
  owners: Owner[];
  rarity: Rarity;
}
