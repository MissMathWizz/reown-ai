import { markets, type Item } from '../lib/inventory';

export function webLink(value: string) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

export function ResearchFields({item, change}: {item: Item; change: (item: Item) => void}) {
  const sales = item.sales ?? [];
  return <fieldset>
    <legend>Product and resale research</legend>
    <label>Original retailer product URL
      <input type="url" pattern="https?://.+" placeholder="Paste the exact product page" value={item.productUrl ?? ''}
        onChange={event => change({...item, productUrl: event.target.value})}/>
    </label>
    {webLink(item.productUrl ?? '') && <a href={webLink(item.productUrl ?? '')} target="_blank" rel="noreferrer">Open retailer page</a>}
    <h3>Comparable sold listings</h3>
    {sales.map((sale, index) => {
      function update(patch: Partial<typeof sale>) {
        change({...item, sales: sales.map((row, i) => i === index ? {...row, ...patch} : row)});
      }
      return <fieldset key={index}><legend>Sale {index + 1}</legend>
        <label>Marketplace<select value={sale.market} onChange={e => update({market: e.target.value as typeof sale.market})}>{markets.map(m => <option key={m}>{m}</option>)}</select></label>
        <label>Sold price<input type="number" min="0" step="0.01" required value={sale.price} onChange={e => update({price:e.target.value})}/></label>
        <label>Currency<input required pattern="[A-Z]{3}" maxLength={3} value={sale.currency} onChange={e => update({currency:e.target.value.toUpperCase()})}/></label>
        <label>Sold listing URL<input type="url" pattern="https?://.+" value={sale.url} onChange={e => update({url:e.target.value})}/></label>
        {webLink(sale.url) && <a href={webLink(sale.url)} target="_blank" rel="noreferrer">Open sold listing</a>}
        <button type="button" onClick={() => change({...item, sales:sales.filter((_, i) => i !== index)})}>Remove sale</button>
      </fieldset>;
    })}
    <button type="button" onClick={() => change({...item, sales:[...sales, {market:'Poshmark', price:'', currency:'USD', url:''}]})}>Add comparable sale</button>
  </fieldset>;
}
