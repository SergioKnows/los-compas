'use client';
import Image from 'next/image';
import {useEffect,useRef,useState,type PointerEvent} from 'react';
import type {ProductImage} from '@/lib/product-images';
const sizes='(min-width: 768px) 580px, 100vw';
const AUTOPLAY_MS=6000;
// Crossfade apilado (mismo efecto que el slider del perfil en sergio-garcia/about): todas las fotos
// superpuestas, la activa entra a opacidad y escala normal y la saliente se desvanece con un leve
// zoom, desplazamiento y giro. Autoplay cada AUTOPLAY_MS, pausa con el mouse encima y respeta reduced-motion.
// Bullets y swipe para navegar; un clic/tap sin arrastrar llama a onOpen (abre el diálogo).
export function ProductGallery({images,name,priority=false,onOpen,size='aspect-[4/3]'}:{images:ProductImage[];name:string;priority?:boolean;onOpen?:()=>void;size?:string}){
 const count=images.length,[active,setActive]=useState(0);
 const paused=useRef(false),lastInteraction=useRef(0),swipe=useRef<{x:number;moved:boolean}|null>(null),suppressClick=useRef(false);
 useEffect(()=>{
  if(count<2||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=setInterval(()=>{
   if(paused.current||document.hidden||Date.now()-lastInteraction.current<AUTOPLAY_MS)return;
   setActive(i=>(i+1)%count);
  },AUTOPLAY_MS);
  return()=>clearInterval(timer);
 },[count]);
 const go=(i:number)=>{lastInteraction.current=Date.now();setActive((i+count)%count);};
 const onPointerEnter=(e:PointerEvent<HTMLDivElement>)=>{if(e.pointerType==='mouse')paused.current=true;};
 const onPointerLeave=(e:PointerEvent<HTMLDivElement>)=>{swipe.current=null;if(e.pointerType==='mouse')paused.current=false;};
 const onPointerDown=(e:PointerEvent<HTMLDivElement>)=>{swipe.current={x:e.clientX,moved:false};};
 const onPointerMove=(e:PointerEvent<HTMLDivElement>)=>{const s=swipe.current;if(s&&Math.abs(e.clientX-s.x)>8)s.moved=true;};
 const onPointerUp=(e:PointerEvent<HTMLDivElement>)=>{
  const s=swipe.current;swipe.current=null;if(!s||!s.moved||count<2)return;
  suppressClick.current=true;go(e.clientX<s.x?active+1:active-1);
 };
 const onClick=()=>{if(suppressClick.current){suppressClick.current=false;return;}onOpen?.();};
 const clickable=onOpen?'cursor-pointer':'';
 if(count===1)return <div className={`relative ${size} overflow-hidden bg-soft ${clickable}`} onClick={onOpen}><Image src={images[0].src} alt={images[0].alt} fill sizes={sizes} priority={priority} draggable={false} className="object-cover"/></div>;
 return <div className={`relative ${size} overflow-hidden bg-soft`} aria-roledescription="carrusel" aria-label={`Fotos de ${name}`}>
  <div className={`absolute inset-0 touch-pan-y select-none ${clickable}`} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onClick={onClick}>
   {images.map((img,i)=><Image key={img.alt} src={img.src} alt={img.alt} fill sizes={sizes} priority={priority&&i===0} draggable={false} aria-hidden={i!==active} className={`object-cover motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out ${i===active?'z-10 translate-x-0 scale-100 rotate-0 opacity-100':'z-0 -translate-x-4 scale-110 -rotate-6 opacity-0'}`}/>)}
  </div>
  <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-2" role="tablist" aria-label="Elegir foto">
   {images.map((img,i)=><button key={img.alt} type="button" role="tab" aria-selected={i===active} aria-label={`Ver foto ${i+1}: ${img.alt}`} onClick={()=>go(i)} className={`h-2.5 rounded-full border border-carbon/30 transition-all duration-300 ${i===active?'w-5 bg-carbon':'w-2.5 bg-white/70 hover:bg-white'}`}/>)}
  </div>
 </div>;
}
