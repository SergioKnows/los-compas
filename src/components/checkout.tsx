'use client';
import {useState,type FormEvent} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,ShoppingBag,MapPin,MessageCircle,ShieldCheck,Copy,Check,Wallet} from 'lucide-react';
import {useCart} from './cart-provider';
import {CartLines,WhatsAppIcon,WhatsAppLink} from './store-shell';
import {business,money,subtotal,orderMessage,whatsappUrl,type Customer} from '@/lib/catalog';
import {wrap,eyebrow,button,textButton} from './ui';
const label='mb-5 block text-xs font-bold';
const optional='font-normal text-muted';
const field='mt-[9px] block min-h-12 w-full resize-y rounded-[5px] border border-[#d6d7d1] bg-white p-3.5 text-sm placeholder:text-[#898982] max-md:text-base';
const formTitle='flex items-center gap-3';
const formStep='grid size-[27px] shrink-0 place-items-center rounded-full bg-[#f2f2ed] text-[11px]';
const formHeading='text-lg font-bold leading-[1.4] max-md:text-[17px]';
const empty='flex flex-col items-center justify-center gap-[18px] px-6 py-[65px] text-center';
const totalRow='mb-[15px] flex justify-between gap-3 text-[13px]';
export function Checkout(){
 const cart=useCart(),[customer,setCustomer]=useState<Customer>({name:'',phone:'',address:'',reference:'',notes:'',payment:'A convenir por WhatsApp'}),[error,setError]=useState(''),[prepared,setPrepared]=useState(false),[copied,setCopied]=useState(false);
 const update=(key:keyof Customer,value:string)=>{setCustomer(old=>({...old,[key]:value}));setPrepared(false);};
 const submit=(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();setError('');
  if(!customer.name.trim()||!customer.address.trim()){setError('Completa tu nombre y la dirección de entrega.');return;}
  if(!/^\+?[\d\s()-]{7,22}$/.test(customer.phone)||customer.phone.replace(/\D/g,'').length<7){setError('Revisa el número de celular.');return;}
  if(!cart.lines.length){setError('Agrega al menos un perro a tu pedido.');return;}
  const url=whatsappUrl(orderMessage(cart.lines,customer));if(!url){setError('El canal de pedidos aún no está disponible.');return;}
  // Opening WhatsApp does not mean the customer sent or paid for the order.
  window.open(url,'_blank','noopener,noreferrer');setPrepared(true);
 };
 const copyBank=async()=>{try{await navigator.clipboard.writeText(business.bankAccount);setCopied(true);setTimeout(()=>setCopied(false),2500);}catch{setError('No pudimos copiar la cuenta. Puedes seleccionarla manualmente.');}};
 return <main id="contenido" className={`${wrap} pt-[35px] pb-[75px] max-md:pt-5 max-md:pb-[45px]`}>
  <Link href="/#menu" className="inline-flex items-center gap-[7px] py-2.5 text-xs text-muted"><ArrowLeft size={16}/> Volver al menú</Link>
  <div className="my-7 max-md:my-[22px]"><div className={eyebrow}>Un paso más y hablamos</div><h1 className="my-[13px] text-[43px] font-extrabold leading-[1.12] max-md:text-[34px]">Ya casi está el parche.</h1><p className="text-[15px] leading-relaxed text-muted">Revisa tu pedido y cuéntanos dónde te lo llevamos.</p></div>
  <div className="flex items-center gap-3.5 pb-8 text-xs text-muted max-md:gap-[9px] max-md:text-[11px]" aria-label="Proceso del pedido"><span className="flex items-center gap-[7px]"><Check size={15}/> Elige</span><i className="h-px w-[34px] bg-line max-md:w-[19px]"/><span className="flex items-center gap-[7px] font-bold text-hoja"><MapPin size={15}/> Tus datos</span><i className="h-px w-[34px] bg-line max-md:w-[19px]"/><span className="flex items-center gap-[7px]"><MessageCircle size={15}/> WhatsApp</span></div>
  {!cart.ready?<div role="status" className={empty}>Cargando tu pedido…</div>:cart.lines.length?<div className="grid grid-cols-[1.25fr_.85fr] items-start gap-[75px] md:max-lg:grid-cols-[1.1fr_.9fr] md:max-lg:gap-[30px] max-md:grid-cols-1 max-md:gap-[35px]">
   <form className="min-w-0" onSubmit={submit}>
    <div className={`${formTitle} mb-[25px]`}><span className={formStep}>01</span><h2 className={formHeading}>¿A quién le llevamos el pedido?</h2></div>
    <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1 max-md:gap-0"><label className={label} htmlFor="name">Tu nombre<input className={field} id="name" name="name" autoComplete="name" required maxLength={80} value={customer.name} onChange={e=>update('name',e.target.value)} placeholder="Nombre y apellido"/></label><label className={label} htmlFor="phone">Celular<input className={field} id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={22} value={customer.phone} onChange={e=>update('phone',e.target.value)} placeholder="300 123 4567"/></label></div>
    <label className={label} htmlFor="address">Dirección de entrega<input className={field} id="address" name="address" autoComplete="street-address" required maxLength={180} value={customer.address} onChange={e=>update('address',e.target.value)} placeholder="Calle, número, barrio y municipio"/></label>
    <label className={label} htmlFor="reference">Referencia <span className={optional}>(opcional)</span><input className={field} id="reference" name="reference" maxLength={180} value={customer.reference} onChange={e=>update('reference',e.target.value)} placeholder="Unidad, torre, apartamento o punto de referencia"/></label>
    <div className="flex items-start gap-3 border-b border-line pt-[15px] pb-5 text-hoja"><MapPin size={20} className="mt-0.5 shrink-0"/><p className="text-xs leading-[1.7]">Salimos desde María Auxiliadora. Te confirmamos cobertura, valor del domicilio y tiempo de entrega por WhatsApp.</p></div>
    <div className={`${formTitle} mt-[35px] mb-[25px]`}><span className={formStep}>02</span><h2 className={formHeading}>Los últimos detalles</h2></div>
    <label className={label} htmlFor="notes">¿Algo que debamos saber? <span className={optional}>(opcional)</span><textarea className={field} id="notes" name="notes" rows={3} maxLength={500} value={customer.notes} onChange={e=>update('notes',e.target.value)} placeholder="Sin cebolla, indicaciones de entrega…"/></label>
    <div className="flex items-center gap-[13px] py-[17px]"><Wallet size={21} className="shrink-0 text-hoja"/><div><strong className="text-[13px]">Pago a convenir por WhatsApp</strong><p className="mt-1 text-xs text-muted">Primero confirmamos tu pedido y el total.</p></div></div>
    <p className="flex items-start gap-[9px] pt-[17px] pb-5 text-[11px] leading-relaxed text-muted"><ShieldCheck size={17} className="mt-0.5 shrink-0"/> Tus datos se incluyen únicamente en el mensaje que enviarás a Los Compas. No los guardamos en el navegador.</p>
    {error&&<p role="alert" className="mb-3 rounded bg-[#fff0ed] p-[13px] text-[13px] text-[#a62318]">{error}</p>}
    <button className={button('whatsapp','w-full')} type="submit"><WhatsAppIcon/> Continuar en WhatsApp <ArrowRight size={18}/></button>
    {prepared&&<div role="status" className="mt-[15px] flex gap-2.5 rounded-[5px] bg-[#eef5ed] p-4 text-[13px] text-hoja"><Check size={19} className="shrink-0"/><div><strong>Tu mensaje está listo.</strong><p className="mt-1 text-xs leading-relaxed">Envíalo en WhatsApp para que podamos confirmar tu pedido. Si no se abrió, vuelve a pulsar el botón. Tu carrito sigue guardado.</p></div></div>}
    <p className="mt-3.5 text-center text-[11px] leading-normal text-muted">Abrir WhatsApp no confirma el pedido ni realiza un cobro.</p>
   </form>
   <aside className="sticky top-[112px] rounded-lg border border-line p-[26px] md:max-lg:p-[18px] max-md:static max-md:order-first max-md:p-5">
    <div className={`${formTitle} border-b border-line pb-5`}><ShoppingBag size={21}/><h2 className={formHeading}>Tu pedido <span className="font-normal text-muted">({cart.count})</span></h2></div>
    <CartLines/>
    <div className="border-t border-line pt-5"><div className={totalRow}><span>Productos</span><strong>{money(subtotal(cart.lines))}</strong></div><div className={totalRow}><span>Domicilio</span><span>{business.deliveryFee===null?'Por confirmar':money(business.deliveryFee)}</span></div><div className={`${totalRow} mt-5 mb-[5px] border-t border-line pt-[18px] text-[21px]`}><strong>{business.deliveryFee===null?'Subtotal':'Total'}</strong><strong>{money(subtotal(cart.lines)+(business.deliveryFee??0))}</strong></div>{business.deliveryFee===null&&<p className="mb-[18px] text-[11px] text-muted">Más el costo de tu domicilio.</p>}</div>
    <Link href="/#menu" className={`${textButton} mt-1.5`}>Agregar otro compa <ArrowRight size={16}/></Link>
   </aside>
  </div>:<section className={empty}><ShoppingBag size={48} strokeWidth={1.3} className="text-hoja"/><h2 className="text-[23px] font-bold">Tu pedido todavía está vacío.</h2><p className="text-sm leading-relaxed text-muted">El primer paso es elegir un buen perro.</p><Link href="/#menu" className={button('primary')}>Ir al menú <ArrowRight size={18}/></Link></section>}
  <section className="mt-[65px] grid grid-cols-2 gap-[75px] border-t border-line pt-[38px] max-md:mt-10 max-md:grid-cols-1 max-md:gap-[25px]">
   <div><div className={eyebrow}>Todo claro, compa</div><h2 className="my-3 text-[25px] font-bold">Sobre tu pago</h2><p className="max-w-[440px] text-[13px] leading-[1.8] text-muted">Confirmamos disponibilidad, domicilio y total antes de compartir las instrucciones de pago. No realices transferencias sin esa confirmación.</p></div>
   {business.bankAccount?<div><h3 className="my-2.5 text-base font-bold">{business.bankName}</h3><p className="max-w-[440px] text-[13px] leading-[1.8] text-muted">{business.bankHolder}</p><button className="mt-[15px] flex items-center gap-3.5 rounded-[5px] border border-line bg-soft p-3.5" onClick={copyBank}>{business.bankAccount}{copied?<Check size={18}/>:<Copy size={18}/>}</button>{business.paymentQr&&<a className={textButton} href={business.paymentQr} download>Descargar QR de pago</a>}</div>
   :<div><MessageCircle size={25} className="text-hoja"/><h3 className="my-2.5 text-base font-bold">Directo con nosotros</h3><p className="max-w-[440px] text-[13px] leading-[1.8] text-muted">Consulta los medios de pago disponibles y envía tu comprobante en la misma conversación.</p><WhatsAppLink className={textButton}>Hablar con Los Compas</WhatsAppLink></div>}
  </section>
 </main>;
}
