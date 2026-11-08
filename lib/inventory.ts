export type Status = 'Keep' | 'Sell' | 'Donate';
export type Photo = { id: string; name: string; src: string };
export type Item = { productUrl?: string; sales?: {market: Marketplace; price: string; currency: string; url: string}[]; id: string; title: string; category: string; brand: string; condition: string; notes: string; status: Status; photos: Photo[]; demo?: boolean };
export const markets = ['eBay', 'Poshmark', 'OfferUp', 'Craigslist', 'Nextdoor', 'WeChat communities', 'Moon BBS'] as const;
export type Marketplace = typeof markets[number];
export function movePhotos(items: Item[], sourceId: string, targetId: string, photoIds: string[]): Item[] {
 const source = items.find(i=>i.id===sourceId); const target = items.find(i=>i.id===targetId);
 if(!source || !target || sourceId===targetId) return items;
 const moving=source.photos.filter(p=>photoIds.includes(p.id));
 return items.map(i=>i.id===sourceId?{...i,photos:i.photos.filter(p=>!photoIds.includes(p.id))}:i.id===targetId?{...i,photos:[...i.photos,...moving]}:i).filter(i=>i.photos.length>0);
}
export function splitPhotos(items: Item[], sourceId: string, photoIds: string[], newId: string): Item[] {
 const source=items.find(i=>i.id===sourceId); if(!source) return items;
 const photos=source.photos.filter(p=>photoIds.includes(p.id));
 if(!photos.length || photos.length===source.photos.length) return items;
 return [...items.map(i=>i.id===sourceId?{...i,photos:i.photos.filter(p=>!photoIds.includes(p.id))}:i),{...source,id:newId,title:'Untitled item',photos,demo:false}];
}
export function draft(item: Item, market: Marketplace) { return `${market} listing draft — PLACEHOLDER TEMPLATE\n\n${item.title}\n${item.brand ? `Brand: ${item.brand}\n` : ''}Condition: ${item.condition}\nCategory: ${item.category}\n${item.notes || 'Add measurements, wear, and included accessories before listing.'}\n\nPrice: set manually after researching comparable sold items.\nReview this text and the marketplace rules before manually posting.`; }
