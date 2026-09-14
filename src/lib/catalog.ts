export type Product = {id:string;name:string;description:string;price:number;ingredients:string[];sauces:string[];tone:'yellow'|'green'};
export type PaymentMethod={name:string;detail:string;holder:string;account?:string;key:string;qr:string};
export const business = {
  name:'Los Compas',whatsapp:process.env.NEXT_PUBLIC_WHATSAPP??'573113146359',
  openingDate:process.env.NEXT_PUBLIC_OPENING_DATE??'2026-10-02T00:00:00-05:00',
  address:'María Auxiliadora',landmark:'A 5 minutos del CC Mayorca',
  deliveryFee:null as number|null,
  paymentMethods:[
    {name:'Bancolombia',detail:'Ahorros',holder:'Sergio Garcia',account:'61500000968',key:'@sergio9335',qr:'/pago/bancolombia.png'},
    // Nu oculto por ahora; los assets ya están listos en public/pago/nu.png para reactivarlo.
    // {name:'Nu',detail:'',holder:'Sergio Garcia',key:'@SGB909',qr:'/pago/nu.png'},
  ] as PaymentMethod[],
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
// *negrita* es formato nativo de WhatsApp. Bloques separados por línea en blanco para que
// cada producto y cada dato se distinga de un vistazo; se omite lo que no aporta info real
// (domicilio/total solo se muestran si ya hay una tarifa real, no un "por confirmar").
export function orderMessage(lines:CartLine[],c:Customer){
 const sub=subtotal(lines),fee=business.deliveryFee;
 const items=lines.map(l=>{const p=productById(l.productId)!;return `*${l.quantity} x ${p.name}* — ${money(p.price*l.quantity)}\nSalsas: ${p.sauces.length?(l.sauces.join(', ')||'Sin salsas'):'a confirmar con los compas'}`;});
 const totals=fee===null?`*Subtotal: ${money(sub)}*\nDomicilio: se confirma según tu dirección`:`Subtotal: ${money(sub)}\nDomicilio: ${money(fee)}\n*Total: ${money(sub+fee)}*`;
 const customer=[`*Nombre:* ${c.name.trim()}`,`*Celular:* ${c.phone.trim()}`,`*Dirección:* ${c.address.trim()}`,c.reference.trim()&&`*Referencia:* ${c.reference.trim()}`,c.notes.trim()&&`*Notas:* ${c.notes.trim()}`].filter(Boolean).join('\n');
 return ['¡Hola! Quiero pedir en *Los Compas*',...items,totals,customer].join('\n\n');
}
