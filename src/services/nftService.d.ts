import { Nft } from '../models/nft';

declare class NftService {
  private baseUrl: string;
  fetchNfts(collectionSlug: string, next: string | null): Promise<{ nfts: Nft[], next: string | null }>;
  fetchNft(assetToGet: Nft | null): Promise<Nft | null>;
}

export default NftService;
