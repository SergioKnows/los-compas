'use client';
import {useEffect,useState} from 'react';
import {CalendarDays,ArrowDown,ArrowUpRight,MapPin} from 'lucide-react';
import {business} from '@/lib/catalog';
export function Opening(){
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{setNow(Date.now());const interval=setInterval(()=>setNow(Date.now()),60000);return()=>clearInterval(interval);},[]);
 const date=new Date(business.openingDate),valid=!isNaN(date.getTime());
 const remaining=valid&&now!==null?Math.max(0,date.getTime()-now):null;
 const formatted=valid?new Intl.DateTimeFormat('es-CO',{weekday:'long',day:'numeric',month:'long',timeZone:'America/Bogota'}).format(date):'Fecha por anunciar';
 return <section className="hero wrap"><div className="hero-brand"><img className="hero-logo" src="/brand/logo-principal.svg" alt="Los Compas. El parche del buen perro" width="790" height="586" fetchPriority="high"/><span className="brand-caption">BUENOS PERROS. BUENA COMPAÑÍA.</span></div><div><div className="eyebrow">{remaining===0?'Ya llegó el parche':'Nos estrenamos pronto'}</div><h1>{remaining===0?<>Aquí hay<br/>un buen <span>parche.</span></>:<>Se viene<br/>un buen <span>parche.</span></>}</h1><p className="hero-copy">Perros bien cargados, buenos precios y ganas de compartir. De nuestra cocina a tu casa.</p><div className="opening-date"><CalendarDays size={23}/><div><strong>{formatted}</strong><span>{remaining===null?'Guarda la fecha. Nosotros ponemos los perros.':remaining===0?'Consulta la disponibilidad por WhatsApp':`Faltan ${Math.ceil(remaining/86400000)} días para el primer mordisco.`}</span></div></div><div className="hero-actions"><a className="button primary" href="#menu">Conoce el menú <ArrowDown size={18}/></a><a className="button text-link" href="#domicilios">Estamos cerca <ArrowUpRight size={18}/></a></div><p className="hero-note"><MapPin size={15}/>{business.address} · Cerca de Mayorca</p></div></section>;
}
