'use client';
import {useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Plus,X,ArrowUpRight,Flame,Utensils} from 'lucide-react';
import {products,money,type Product} from '@/lib/catalog';
import {productImages} from '@/lib/product-images';
import {useCart} from './cart-provider';
import {ProductGallery} from './product-gallery';
import {wrap,eyebrow,chipButton,button,overlay,dialog,dialogClose,dialogTitle,dialogText,productNumber,tone} from './ui';
// Resalta el tamaño del pan dentro de un ingrediente, ej. "Pan de ajonjolí de 20 cm".
function emphasize(text:string){return text.split(/(20 cm)/).map((part,i)=>part==='20 cm'?<strong key={i} className="font-bold text-carbon">{part}</strong>:part);}
function IngredientList({ingredients}:{ingredients:string[]}){const last=ingredients.length-1;return <p className="text-[13px] leading-[1.85] text-[#66665f]">{ingredients.map((ing,i)=><span key={ing}>{i>0&&(i===last?' y ':', ')}{emphasize(ing)}</span>)}</p>;}
function ProductCard({product,index}:{product:Product;index:number}){
 const {add,ready}=useCart(),[open,setOpen]=useState(false),[sauces,setSauces]=useState<string[]>(product.sauces);
 const choose=(s:string)=>setSauces(old=>old.includes(s)?old.filter(x=>x!==s):[...old,s]);
 const t=tone[product.tone];
 return <article className="flex flex-col overflow-hidden rounded-lg border border-line transition-[box-shadow,translate,scale] duration-300 ease-out motion-safe:hover:-translate-y-[3px] motion-safe:hover:scale-[1.015] hover:shadow-[0_12px_32px_#25252508]">
  <ProductGallery images={productImages[product.id]??[]} name={product.name} priority={index===0}/>
  <div className={`flex h-[76px] items-center justify-between px-7 max-md:h-[66px] max-md:px-[22px] ${t.strip}`}><span className={productNumber}>0{index+1}</span><span className="flex items-center gap-2 text-[11px] font-bold uppercase">{index===0?<Utensils size={17}/>:<Flame size={17}/>} {index===0?'El tradicional':'El de la plancha'}</span></div>
  <div className="flex-1 cursor-pointer px-7 pt-7 pb-[18px] max-md:px-[22px] max-md:pt-[23px] max-md:pb-[15px]" onClick={()=>setOpen(true)}>
   <h3 className="text-[29px] font-[750] leading-[1.1] max-md:text-[27px]">{product.name}</h3>
   <p className="mt-[13px] min-h-12 text-sm leading-[1.7] text-muted max-md:min-h-0">{product.description}</p>
   <div className="mt-6 mb-2.5 max-md:mt-[19px]"><h4 className="mb-2 text-xs font-bold">¿Qué lleva?</h4><IngredientList ingredients={product.ingredients}/></div>
   <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger className={chipButton}>Ingredientes y salsas <ArrowUpRight size={16}/></Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className={overlay}/><Dialog.Content className={dialog}>
     <div className="-mx-8 -mt-8 mb-6 overflow-hidden rounded-t-lg max-md:-mx-[25px] max-md:-mt-[25px]"><ProductGallery images={productImages[product.id]??[]} name={product.name}/></div>
     <Dialog.Close aria-label="Cerrar detalles" className={dialogClose}><X size={20}/></Dialog.Close>
     <span className={`${productNumber} ${t.badge}`}>0{index+1}</span>
     <Dialog.Title className={dialogTitle}>{product.name}</Dialog.Title>
     <Dialog.Description className={dialogText}>{product.description}</Dialog.Description>
     <h3 className="mt-6 mb-2.5 text-sm font-bold">Ingredientes</h3>
     <ul className="list-disc pl-[18px] text-[13px] leading-[1.9] text-muted max-md:text-xs">{product.ingredients.map(i=><li key={i}>{emphasize(i)}</li>)}</ul>
     <h3 className="mt-6 mb-2.5 text-sm font-bold">Salsas</h3>
     {product.sauces.length?<fieldset className="grid grid-cols-2 gap-[9px]"><legend className="sr-only">Elige las salsas para tu perro</legend>{product.sauces.map(s=><label key={s} className="flex cursor-pointer items-center gap-[9px] rounded-[5px] border border-line p-3 text-xs has-checked:border-hoja has-checked:bg-hoja-100"><input type="checkbox" className="size-4 accent-hoja" checked={sauces.includes(s)} onChange={()=>choose(s)}/><span>{s}</span></label>)}</fieldset>:<p className={dialogText}>Pregunta por las salsas disponibles al confirmar tu pedido.</p>}
     <p className="mt-[22px] text-[11px] leading-[1.7] text-muted">¿Tienes alguna alergia? Consúltanos antes de pedir.</p>
     <button className={button('primary','mt-5 w-full')} disabled={!ready} onClick={e=>{add(product.id,sauces,e.currentTarget);setOpen(false);}}>Agregar · {money(product.price)} <Plus size={19}/></button>
    </Dialog.Content></Dialog.Portal>
   </Dialog.Root>
  </div>
  <div className="mx-7 flex items-center justify-between gap-5 border-t border-line py-[22px] max-md:mx-[22px] max-md:py-[18px]">
   <div><span className="mb-1 block text-[11px] text-muted">Por perro</span><strong className="text-[25px]">{money(product.price)}</strong></div>
   <button className={`inline-flex min-h-11 items-center gap-[9px] rounded-md px-[17px] py-3 text-[13px] font-bold transition-[filter,translate] duration-200 hover:brightness-95 motion-safe:hover:-translate-y-0.5 ${t.add}`} aria-label={`Elegir salsas y agregar ${product.name}`} onClick={()=>setOpen(true)}><Plus size={21}/><span>Agregar</span></button>
  </div>
 </article>;
}
export function Menu(){return <section id="menu" className={`${wrap} py-[72px] max-md:py-[42px]`}>
 <div className="mb-8 flex items-end justify-between gap-5 max-md:flex-col max-md:items-start max-md:gap-3.5"><div><div className={eyebrow}>El menú de los compas</div><h2 className="mt-3 text-[38px] font-[750] leading-[1.12] max-md:text-[30px]">Dos formas de<br className="hidden max-md:block"/> armar el parche.</h2></div><p className="text-sm text-muted">Elige tu perro. Nosotros ponemos el cariño.</p></div>
 <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">{products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>
 <p className="mt-[22px] text-center text-xs text-muted max-md:text-left max-md:text-[11px] max-md:leading-relaxed">Nos estrenamos el 2 de octubre. Confirma disponibilidad y domicilio antes de cerrar tu pedido.</p>
</section>;}
