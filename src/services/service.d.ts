import { Nft } from '../models/nft';

declare module 'NftService' {
  export default class NftService {
    constructor(base?: string);
    fetchNfts(collectionSlug: string): Nft[];
  }
}
