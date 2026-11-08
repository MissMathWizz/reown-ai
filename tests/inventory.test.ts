import test from 'node:test';
import assert from 'node:assert/strict';
import { movePhotos, splitPhotos, draft, markets, type Item } from '../lib/inventory';
const a:Item={id:'a',title:'Chair',brand:'',category:'Furniture',condition:'Good',status:'Sell',notes:'Small scratch',photos:[{id:'1',name:'front',src:'local'},{id:'2',name:'back',src:'local'}]};
const b:Item={...a,id:'b',photos:[{id:'3',name:'side',src:'local'}]};
test('move preserves every photo once and removes an empty source',()=>{const result=movePhotos([a,b],'a','b',['1','2']);assert.equal(result.length,1);assert.deepEqual(result[0].photos.map(p=>p.id),['3','1','2']);assert.equal(a.photos.length,2);});
test('split preserves source metadata and all photos',()=>{const result=splitPhotos([a],'a',['2'],'new');assert.equal(result.length,2);assert.deepEqual(result.flatMap(i=>i.photos.map(p=>p.id)).sort(),['1','2']);assert.equal(result[1].status,'Sell');});
test('invalid moves and full splits are no-ops',()=>{const items=[a,b];assert.equal(movePhotos(items,'a','a',['1']),items);assert.equal(movePhotos(items,'a','missing',['1']),items);assert.equal(splitPhotos(items,'a',['1','2'],'new'),items);});
test('all marketplace templates disclose placeholder and manual review',()=>{for(const market of markets){const text=draft(a,market);assert.ok(text.includes(market));assert.ok(text.includes('PLACEHOLDER'));assert.ok(text.includes('manually posting'));assert.ok(text.includes('Small scratch'));}});
