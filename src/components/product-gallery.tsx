'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import type {ProductImage} from '@/lib/product-images';
const sizes='(min-width: 768px) 580px, 100vw';
// Una sola foto se muestra fija; con varias, un slider por scroll-snap sin flechas: se desliza y se navega con las bullets.
export function ProductGallery({images,name,priority=false}:{images:ProductImage[];name:string;priority?:boolean}){
 const track=useRef<HTMLDivElement>(null),[active,setActive]=useState(0);
 useEffect(()=>{
  const el=track.current;if(!el||images.length<2)return;
  const onScroll=()=>setActive(Math.round(el.scrollLeft/el.clientWidth));
  el.addEventListener('scroll',onScroll,{passive:true});return()=>el.removeEventListener('scroll',onScroll);
 },[images.length]);
 const go=(i:number)=>track.current?.scrollTo({left:i*track.current.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 if(images.length===1)return <div className="relative aspect-[4/3] bg-soft"><Image src={images[0].src} alt={images[0].alt} fill sizes={sizes} priority={priority} className="object-cover"/></div>;
 return <div className="relative aspect-[4/3] bg-soft" aria-roledescription="carrusel" aria-label={`Fotos de ${name}`}>
  <div ref={track} className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
   {images.map((img,i)=><div key={img.alt} className="relative h-full w-full shrink-0 snap-center" aria-roledescription="foto" aria-label={`${i+1} de ${images.length}`}><Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority&&i===0} className="object-cover"/></div>)}
  </div>
  <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2" role="tablist" aria-label="Elegir foto">
   {images.map((img,i)=><button key={img.alt} type="button" role="tab" aria-selected={i===active} aria-label={`Ver foto ${i+1}: ${img.alt}`} onClick={()=>go(i)} className={`size-2.5 rounded-full border border-carbon/30 transition-colors ${i===active?'bg-carbon':'bg-white/70 hover:bg-white'}`}/>)}
  </div>
 </div>;
}
