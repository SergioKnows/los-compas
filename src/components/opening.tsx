'use client';
import {useEffect,useState} from 'react';
import {CalendarDays,ArrowDown,ArrowUpRight,MapPin} from 'lucide-react';
import {business} from '@/lib/catalog';
import {wrap,eyebrow,button} from './ui';
export function Opening(){
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{setNow(Date.now());const interval=setInterval(()=>setNow(Date.now()),60000);return()=>clearInterval(interval);},[]);
 const date=new Date(business.openingDate),valid=!isNaN(date.getTime());
 const remaining=valid&&now!==null?Math.max(0,date.getTime()-now):null;
 const formatted=valid?new Intl.DateTimeFormat('es-CO',{weekday:'long',day:'numeric',month:'long',timeZone:'America/Bogota'}).format(date):'Fecha por anunciar';
 return <section className={`${wrap} grid grid-cols-2 items-center gap-[76px] py-[55px] md:max-lg:gap-[35px] max-md:grid-cols-1 max-md:gap-[30px] max-md:pt-7 max-md:pb-9`}>
  <div className="min-w-0"><img className="mx-auto block w-full max-w-[460px] max-md:max-w-[265px]" src="/brand/logo-principal.svg" alt="Los Compas. El parche del buen perro" width="790" height="586" fetchPriority="high"/><span className="mt-[26px] block text-center text-[10px] font-bold text-muted max-md:hidden">BUENOS PERROS. BUENA COMPAÑÍA.</span></div>
  <div>
   <div className={eyebrow}>{remaining===0?'Ya llegó el parche':'Nos estrenamos pronto'}</div>
   <h1 className="my-[22px] text-[60px] font-extrabold leading-[1.03] md:max-lg:text-[49px] max-md:my-4 max-md:text-[42px]">{remaining===0?<>Aquí hay<br/>un buen <span className="text-tomate">parche.</span></>:<>Se viene<br/>un buen <span className="text-tomate">parche.</span></>}</h1>
   <p className="max-w-[390px] text-base leading-[1.7] text-muted max-md:max-w-none max-md:text-[15px]">Perros bien cargados, buenos precios y ganas de compartir. De nuestra cocina a tu casa.</p>
   <div className="mt-6 flex max-w-[390px] items-center gap-3.5 border-y border-line py-4 max-md:mt-5 max-md:max-w-none max-md:py-[13px]"><CalendarDays size={23} className="shrink-0 text-tomate"/><div><strong className="block text-[17px] capitalize max-md:text-base">{formatted}</strong><span className="mt-[5px] block text-xs text-muted max-md:text-[11px]">{remaining===null?'Guarda la fecha. Nosotros ponemos los perros.':remaining===0?'Consulta la disponibilidad por WhatsApp':`Faltan ${Math.ceil(remaining/86400000)} días para el primer mordisco.`}</span></div></div>
   <div className="mt-7 flex flex-wrap gap-5 md:max-lg:gap-2 max-md:mt-[22px] max-md:gap-3"><a className={button('primary','md:max-lg:px-3.5 max-md:px-[15px] max-md:text-[13px]')} href="#menu">Conoce el menú <ArrowDown size={18}/></a><a className={button('text','max-md:text-[13px]')} href="#domicilios">Estamos cerca <ArrowUpRight size={18}/></a></div>
   <p className="mt-[22px] flex items-center gap-2 text-xs text-muted max-md:mt-[18px] max-md:text-[11px]"><MapPin size={15}/>{business.address} · Cerca de Mayorca</p>
  </div>
 </section>;
}
