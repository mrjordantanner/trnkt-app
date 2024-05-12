export interface AssetTrait {
  type: string;
  value: string;
}

export interface AssetData {
  identifier: string;
  token_id: string;
  image_url: string;
  name: string;
  price: number;
  description: string;
  creator: string;
  traits: AssetTrait[];
}

export type Asset = {
  valid: boolean;
  id: string;
  tokenID: string;
  imgUrl: string;
  name: string;
  price: number;
  description: string;
  creator: string;
  traits: AssetTrait[];
} | null;

// TODO use this after getting response from API
export function mapDataToAsset(assetData: AssetData): Asset {
  return {
    id: assetData.identifier,
    tokenID: assetData.token_id,
    imgUrl: assetData.image_url,
    price: assetData.price,
    name: getName(assetData),
    description: getDescription(assetData),
    creator: getCreator(assetData),
    valid: !!assetData.image_url,
    traits: assetData.traits
  };
}

export function getName(asset: AssetData): string {
  return asset.name ?? 'Untitled';
}

export function getDescription(asset: AssetData): string {
  return asset.description ?? 'No item description';
}

export function getCreator(asset: AssetData): string {
  const username = asset.creator ?? 'Unknown creator';
  return username;
}
