'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import {ShoppingBag,X,Plus,Minus,Trash2,ArrowRight,ArrowUpRight,MapPin,MessageCircle,Check,Bike} from 'lucide-react';
import {useCart} from './cart-provider';
import {business,productById,subtotal,money,whatsappUrl} from '@/lib/catalog';
import {productImages} from '@/lib/product-images';
import {wrap,eyebrow,iconButton,textButton,button,overlay,dialog,dialogClose,dialogTitle,dialogText} from './ui';
export function WhatsAppIcon({size=22}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.298.447-.447.149-.149.198-.248.297-.447.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2a10 10 0 0 0-8.66 15L2 22l5.12-1.34A10 10 0 1 0 12 2m0 18a8 8 0 0 1-4.1-1.13l-.35-.21-3.04.8.81-2.96-.23-.37A8 8 0 1 1 12 20"/></svg>}
export function WhatsAppLink({className='',children}:{className?:string;children?:React.ReactNode}){
 const url=whatsappUrl('Hola, me gustaría pedir en Los Compas.');
 if(url)return <a href={url} target="_blank" rel="noopener noreferrer" className={className} aria-label="Pedir por WhatsApp"><WhatsAppIcon/>{children}</a>;
 return <Dialog.Root><Dialog.Trigger className={className} aria-label="Consultar pedidos por WhatsApp"><WhatsAppIcon/>{children}</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className={overlay}/><Dialog.Content className={dialog}><Dialog.Close className={dialogClose} aria-label="Cerrar"><X size={20}/></Dialog.Close><MessageCircle size={30}/><Dialog.Title className={dialogTitle}>Nos hablamos muy pronto.</Dialog.Title><Dialog.Description className={dialogText}>Estamos preparando nuestro canal de pedidos. El WhatsApp estará disponible para la apertura.</Dialog.Description><Dialog.Close className={button('yellow','mt-[25px]')}>Entendido <Check size={18}/></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
const qtyButton='grid size-9 shrink-0 place-items-center bg-white hover:bg-soft disabled:opacity-25';
export function CartLines(){const {lines,quantity}=useCart();return <div>{lines.map(line=>{const p=productById(line.productId)!,photo=productImages[p.id]?.[0];return <article className="relative flex gap-[15px] border-b border-line py-6 last:border-b-0" key={line.key}>
 <div className={`relative size-16 shrink-0 overflow-hidden rounded-[5px] ${p.tone==='green'?'bg-hoja-50 text-hoja':'bg-mostaza-100'}`}>{photo?<Image src={photo.src} alt="" fill sizes="64px" className="object-cover"/>:<ShoppingBag size={25} className="absolute inset-0 m-auto"/>}</div>
 <div className="min-w-0 flex-1"><h3 className="text-[15px] font-bold leading-[1.4]">{p.name}</h3><p className="mt-[5px] mb-2 text-[11px] leading-[1.4] text-muted">{p.sauces.length?(line.sauces.join(', ')||'Sin salsas'):'Salsas a confirmar'}</p><strong className="text-sm">{money(p.price*line.quantity)}</strong>
  <div className="mt-3 flex h-9 w-[114px] items-center overflow-hidden rounded-[5px] border border-line"><button className={qtyButton} aria-label={`Quitar uno de ${p.name}`} onClick={()=>quantity(line.key,line.quantity-1)}><Minus size={15}/></button><span className="w-10 text-center text-[13px] font-semibold" aria-label="Cantidad">{line.quantity}</span><button className={qtyButton} aria-label={`Añadir uno de ${p.name}`} disabled={line.quantity>=20} onClick={()=>quantity(line.key,line.quantity+1)}><Plus size={15}/></button></div></div>
 <button className="self-start p-2 text-[#777] hover:text-tomate" aria-label={`Eliminar ${p.name}`} onClick={()=>quantity(line.key,0)}><Trash2 size={16}/></button>
</article>;})}</div>;}
export function Header(){const cart=useCart(),pathname=usePathname();return <>
 <a className="fixed -top-[100px] left-4 z-[100] bg-mostaza p-4 focus:top-4" href="#contenido">Saltar al contenido</a>
 <div className="flex items-center justify-center gap-[7px] bg-hoja px-4 py-2.5 text-center text-xs text-white"><MapPin size={13}/><span>{business.address} · {business.landmark}</span></div>
 <header className="sticky top-0 z-30 h-[84px] border-b border-line bg-white/[.93] backdrop-blur-lg max-md:h-[72px]"><div className={`${wrap} flex h-full items-center justify-between gap-6`}>
  <Link href="/" aria-label="Los Compas, inicio"><img className="block w-[106px] max-md:w-[85px]" src="/brand/logo-compacto.svg" alt="Los Compas" width="106" height="64"/></Link>
  <nav className="flex items-center gap-8 text-sm font-semibold max-md:gap-4" aria-label="Navegación principal">
   <Link href="/#menu" className="hover:text-tomate-700">El menú</Link><Link href="/#domicilios" className="hover:text-tomate-700 max-md:hidden">Domicilios</Link><Link href="/pagar" className={`hover:text-tomate-700 max-md:hidden ${pathname==='/pagar'?'text-tomate-700':''}`}>Tu pedido</Link>
   <Dialog.Root open={cart.open} onOpenChange={cart.setOpen}>
    <Dialog.Trigger asChild><button id="cart-trigger" className={`${iconButton} size-[46px]`} aria-label={`Abrir carrito, ${cart.count} productos`}><ShoppingBag size={21}/>{cart.count>0&&<span className="absolute -right-1 -top-[3px] grid size-[21px] place-items-center rounded-full bg-tomate text-[10px] font-bold text-white motion-safe:animate-bump" key={cart.count}>{cart.count}</span>}</button></Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className={overlay}/><Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-[min(460px,100%)] flex-col bg-white shadow-[-10px_0_50px_#0001] motion-safe:animate-slide-in">
     <div className="flex items-center justify-between gap-2.5 border-b border-line px-6 py-[26px] max-md:px-5"><div><div className={`${eyebrow} text-[10px]`}>El parche va tomando forma</div><Dialog.Title className="mt-2.5 text-[26px] font-bold">Tu pedido <span className="font-normal text-muted">({cart.count})</span></Dialog.Title></div><Dialog.Close className={`${iconButton} size-[46px]`} aria-label="Cerrar carrito"><X size={20}/></Dialog.Close></div>
     <Dialog.Description className="sr-only">Revisa tus perros, salsas y cantidades antes de continuar.</Dialog.Description>
     {cart.lines.length?<><div className="flex-1 overflow-y-auto px-6 max-md:px-5"><CartLines/></div><div className="border-t border-line px-6 pt-[22px] pb-[max(20px,env(safe-area-inset-bottom))] max-md:px-5"><div className="flex justify-between gap-3 text-[17px]"><span>Subtotal</span><strong>{money(subtotal(cart.lines))}</strong></div><p className="mt-2.5 mb-5 text-xs leading-normal text-muted">El valor del domicilio se confirma según tu dirección.</p><Dialog.Close asChild><Link className={button('primary','w-full')} href="/pagar">Continuar con mi pedido <ArrowRight size={18}/></Link></Dialog.Close><Dialog.Close className={`${textButton} w-full justify-center`}>Seguir viendo el menú</Dialog.Close></div></>
     :<div className="flex flex-1 flex-col items-center justify-center gap-[18px] px-6 py-[65px] text-center"><ShoppingBag size={44} strokeWidth={1.3} className="text-hoja"/><h3 className="text-[23px] font-bold">Aquí empieza el parche.</h3><p className="text-sm leading-relaxed text-muted">Todavía no has agregado ningún perro.</p><Dialog.Close asChild><Link href="/#menu" className={button('yellow')}>Conocer el menú <ArrowRight size={18}/></Link></Dialog.Close></div>}
    </Dialog.Content></Dialog.Portal>
   </Dialog.Root>
  </nav>
 </div></header>
</>;}
const footerLink='mb-2 block text-[13px] leading-[1.8] text-muted';
export function Footer(){return <>
 <footer className="border-t border-line bg-soft pt-[45px] pb-[100px] max-md:pt-8 max-md:pb-24">
  <div className={`${wrap} grid grid-cols-[1.2fr_.8fr_1fr] gap-[50px] max-md:grid-cols-2 max-md:gap-x-[22px] max-md:gap-y-8`}>
   <div><img className="mb-[18px] block w-[100px]" src="/brand/logo-compacto.svg" alt="Los Compas" width="120" height="75"/><p className="text-[13px] leading-[1.8] text-muted">Buenos perros.<br/>Buena compañía.</p></div>
   <div><h3 className="mb-[18px] text-[13px] font-bold">El parche</h3><Link className={footerLink} href="/#menu">Nuestro menú</Link><Link className={footerLink} href="/#domicilios">Domicilios</Link><Link className={footerLink} href="/pagar">Tu pedido y pagos</Link></div>
   <div className="max-md:col-span-full"><h3 className="mb-[18px] text-[13px] font-bold">Por aquí estamos</h3><p className="text-[13px] leading-[1.8] text-muted">{business.address}<br/>{business.landmark}</p><span className="mt-3 flex items-center gap-2 text-xs text-hoja"><Bike size={16}/> Por ahora, solo domicilios</span></div>
  </div>
  <div className={`${wrap} mt-[35px] flex justify-between border-t border-line pt-7 text-[11px] text-muted max-md:mt-[27px]`}><span>© {new Date().getFullYear()} Los Compas</span><span>Hecho para compartir.</span></div>
 </footer>
 <WhatsAppLink className="fixed right-[26px] bottom-[max(22px,env(safe-area-inset-bottom))] z-[35] flex min-h-[54px] items-center justify-center gap-2.5 rounded-[50px] bg-whatsapp px-[18px] py-[15px] text-white shadow-[0_5px_22px_#183a3526] transition-transform hover:bg-whatsapp-700 motion-safe:hover:-translate-y-[3px] max-md:right-[18px] max-md:bottom-[max(18px,env(safe-area-inset-bottom))] max-md:size-[55px] max-md:p-0 max-md:[&>svg]:size-[26px]"><span className="flex items-center gap-2 text-xs font-bold max-md:hidden">Hablemos, compa <ArrowUpRight size={15}/></span></WhatsAppLink>
</>;}
