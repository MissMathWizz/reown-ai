import type { Item, Marketplace, Photo } from './inventory';
export interface VisionAdapter {
 group(photos: Photo[]): Promise<{photoIds:string[]; confidence:number}[]>;
 identify(photos: Photo[]): Promise<{title:string; brand?:string; category:string; confidence:number; evidenceUrls:string[]}[]>;
}
export interface ValuationAdapter { estimate(item:Item):Promise<{low:number; high:number; currency:string; comparableUrls:string[]; observedAt:string}>; }
export interface MarketplaceAdapter {
 marketplace: Marketplace;
 capabilities: { draft: boolean; officialPublishing: boolean };
 createDraft(item:Item):Promise<{title:string; description:string}>;
 // Publishing requires a separate approved implementation, verified official API, and user confirmation.
}
