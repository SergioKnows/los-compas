export type Product = {id:string;name:string;description:string;price:number;ingredients:string[];sauces:string[];tone:'yellow'|'green'};
export const business = {
  name:'Los Compas',whatsapp:process.env.NEXT_PUBLIC_WHATSAPP??'573113146359',
  openingDate:process.env.NEXT_PUBLIC_OPENING_DATE??'2026-10-02T00:00:00-05:00',
  address:'María Auxiliadora',landmark:'A 5 minutos del CC Mayorca',
  deliveryFee:null as number|null,bankName:'',bankAccount:'',bankHolder:'',paymentQr:'',
};
const ingredients=['Pan de ajonjolí de 20 cm','Salchicha','Ensalada de la casa','Cebolla','Ripio de papas','Salsas'];
export const products:Product[]=[
 {id:'sencillo',name:'Sencillo',description:'El de siempre, bien hecho. Un encuentro de sabores con el contraste perfecto entre suave y crocante.',price:13000,ingredients:[...ingredients,'Queso costeño rallado'],sauces:['Roja','Mayonesa','Mostaza'],tone:'yellow'},
 {id:'plancha',name:'Perro a la plancha',description:'El calor une todos los sabores. Compacto y cómodo de comer, para disfrutar cada mordisco.',price:14000,ingredients:[...ingredients,'Queso costeño integrado'],sauces:['Roja','Ajo','Rosada','Mostaza'],tone:'green'},
];
export const money=(n:number)=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
export const productById=(id:string)=>products.find(p=>p.id===id);
export function whatsappUrl(text:string,phone=business.whatsapp){const n=phone.replace(/[\s+()-]/g,'');return /^\d{10,15}$/.test(n)?`https://wa.me/${n}?text=${encodeURIComponent(text)}`:null;}
export type CartLine={key:string;productId:string;quantity:number;sauces:string[]};
export const lineKey=(id:string,s:string[])=>JSON.stringify([id,[...s].sort()]);
export function restoreCart(raw:unknown):CartLine[]{
 if(!Array.isArray(raw))return [];const result=new Map<string,CartLine>();
 for(const e of raw.slice(0,50)){if(!e||typeof e!=='object')continue;const p=productById(e.productId);if(!p||!Number.isInteger(e.quantity)||e.quantity<1)continue;
 const sauces=Array.isArray(e.sauces)?[...new Set<string>(e.sauces.filter((s:unknown)=>typeof s==='string'&&p.sauces.includes(s)))].sort():[];const key=lineKey(p.id,sauces);
 result.set(key,{key,productId:p.id,sauces,quantity:Math.min(e.quantity+(result.get(key)?.quantity??0),20)});}return [...result.values()];
}
export const subtotal=(lines:CartLine[])=>lines.reduce((n,l)=>n+(productById(l.productId)?.price??0)*l.quantity,0);
export type Customer={name:string;phone:string;address:string;reference:string;notes:string;payment:string};
export function orderMessage(lines:CartLine[],c:Customer){const sub=subtotal(lines);return [
 'Hola, me gustaría pedir en Los Compas:','',
 ...lines.map(l=>{const p=productById(l.productId)!;return `${l.quantity} x ${p.name} — ${money(p.price*l.quantity)}\nSalsas: ${p.sauces.length?(l.sauces.join(', ')||'Sin salsas'):'a confirmar con los compas'}`;}),'',
 `Subtotal: ${money(sub)}`,`Domicilio: ${business.deliveryFee===null?'por confirmar según dirección':money(business.deliveryFee)}`,
 `Total: ${business.deliveryFee===null?'subtotal + domicilio por confirmar':money(sub+business.deliveryFee)}`,'',
 `Nombre: ${c.name.trim()}`,`Celular: ${c.phone.trim()}`,`Dirección: ${c.address.trim()}`,c.reference.trim()?`Referencia: ${c.reference.trim()}`:'',`Pago: ${c.payment}`,c.notes.trim()?`Notas: ${c.notes.trim()}`:'','',
 'Quedo pendiente de confirmar disponibilidad, total y tiempo de entrega.',
 ].join('\n');}
