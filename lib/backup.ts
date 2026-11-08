import { markets, type Item } from './inventory';

export function parseBackup(text: string): Item[] {
     const backup = JSON.parse(text);
     const ids = new Set<string>();
     function unique(id: unknown) {
       if (typeof id !== 'string' || !id || ids.has(id)) return false;
       ids.add(id);
       return true;
     }
     if (backup?.version !== 1 || !Array.isArray(backup.items) ||
       !backup.items.every((item: Item) => item && unique(item.id) &&
         (item.productUrl === undefined || typeof item.productUrl === 'string') &&
         (item.sales === undefined || (Array.isArray(item.sales) && item.sales.every(sale =>
           sale && markets.includes(sale.market) && [sale.price,sale.currency,sale.url].every(value => typeof value === 'string')))) &&
         [item.title,item.brand,item.condition,item.category,item.notes].every(value => typeof value === 'string') &&
         ['Keep', 'Sell', 'Donate'].includes(item.status) && Array.isArray(item.photos) && item.photos.length &&
         item.photos.every(photo => photo && unique(photo.id) && typeof photo.name === 'string' &&
           typeof photo.src === 'string' && /^data:image\/(jpeg|png|webp|svg\+xml)[;,]/i.test(photo.src)))) {
       throw new Error('Invalid backup');
     }
  return backup.items;
}
