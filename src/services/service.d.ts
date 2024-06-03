import { Nft } from '../models/nft';

declare class NftService {
  private baseUrl: string;
  fetchNfts(collectionSlug: string): Promise<Nft[] | null>;
  fetchNft(assetToGet: Nft | null): Promise<Nft | null>;
}

export default NftService;
