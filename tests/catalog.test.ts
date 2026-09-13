import test from 'node:test';
import assert from 'node:assert/strict';
import {products,restoreCart,lineKey,subtotal,orderMessage,whatsappUrl} from '../src/lib/catalog.ts';
test('precios y salsas confirmados',()=>{assert.deepEqual(products.map(p=>p.price),[13000,14000]);assert.deepEqual(products[1].sauces,['Roja','Ajo','Rosada','Mostaza']);});
test('restauración ignora líneas inválidas y precios adulterados',()=>{
 const lines=restoreCart([{productId:'sencillo',quantity:2,sauces:['Roja','No existe','Roja'],price:1},{productId:'fake',quantity:2},{productId:'plancha',quantity:-1},{productId:'plancha',quantity:1.5}]);
 assert.equal(lines.length,1);assert.deepEqual(lines[0].sauces,['Roja']);assert.equal(subtotal(lines),26000);
});
test('separa salsas, combina duplicados y limita cantidades',()=>{const lines=restoreCart([{productId:'sencillo',quantity:18,sauces:['Roja']},{productId:'sencillo',quantity:10,sauces:['Roja']},{productId:'sencillo',quantity:1,sauces:[]}]);assert.equal(lines.length,2);assert.equal(lines[0].quantity,20);assert.notEqual(lines[0].key,lines[1].key);assert.equal(lineKey('a',['b','c']),lineKey('a',['c','b']));});
test('mensaje incluye contactos, salsas, subtotales y domicilio sin inventarlo',()=>{
 const lines=restoreCart([{productId:'sencillo',quantity:2,sauces:[]},{productId:'plancha',quantity:1,sauces:['Ajo','Rosada']}]);
 const message=orderMessage(lines,{name:'Ana',phone:'3001234567',address:'Calle 10 #20-30',reference:'Torre 2',notes:'Sin cebolla & gracias',payment:'A convenir por WhatsApp'});
 assert.equal(subtotal(lines),40000);for(const text of ['2 x Sencillo','1 x Perro a la plancha','Sin salsas','Ajo, Rosada','Ana','3001234567','Torre 2','Sin cebolla & gracias','por confirmar según dirección'])assert.ok(message.includes(text),text);
 const url=new URL(whatsappUrl(message)!);assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/573113146359');assert.equal(url.searchParams.get('text'),message);
});
test('rechaza números no configurados o malformados',()=>{assert.equal(whatsappUrl('Hola',''),null);assert.equal(whatsappUrl('Hola','abc'),null);assert.ok(whatsappUrl('Hola','+57 311 3146359'));assert.deepEqual(restoreCart(null),[]);});
