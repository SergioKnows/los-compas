'use client';
import {createContext,useContext,useEffect,useState,useCallback,type ReactNode} from 'react';
import {type CartLine,lineKey,restoreCart,productById} from '@/lib/catalog';
const KEY='los-compas-cart-v1';
type Store={lines:CartLine[];ready:boolean;open:boolean;setOpen:(v:boolean)=>void;count:number;add:(id:string,sauces:string[],button?:HTMLElement)=>void;quantity:(key:string,n:number)=>void;clear:()=>void;notice:string};
const Context=createContext<Store|null>(null);
function flyToCart(source:HTMLElement){
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const target=document.getElementById('cart-trigger');if(!target)return;
 const a=source.getBoundingClientRect(),b=target.getBoundingClientRect(),token=document.createElement('img');
 token.src='/brand/logo-compacto.svg';token.alt='';token.setAttribute('aria-hidden','true');
 Object.assign(token.style,{position:'fixed',left:`${a.left+a.width/2-26}px`,top:`${a.top-20}px`,width:'52px',height:'52px',padding:'5px',background:'#fff',borderRadius:'50%',zIndex:'100',pointerEvents:'none',boxShadow:'0 4px 20px #0002'});
 document.body.appendChild(token);
 token.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${b.left+b.width/2-a.left-a.width/2}px,${b.top+b.height/2-a.top-6}px) scale(.25)`,opacity:.3}],{duration:650,easing:'cubic-bezier(.3,.05,.3,1)'}).finished.catch(()=>{}).finally(()=>token.remove());
}
export function CartProvider({children}:{children:ReactNode}){
 const [lines,setLines]=useState<CartLine[]>([]),[ready,setReady]=useState(false),[open,setOpen]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>{try{setLines(restoreCart(JSON.parse(localStorage.getItem(KEY)??'[]')));}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(KEY,JSON.stringify(lines));}catch{}},[lines,ready]);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),3000);return()=>clearTimeout(timer);},[notice]);
 const add=useCallback((id:string,sauces:string[],button?:HTMLElement)=>{
  const p=productById(id);if(!p)return;const safe=[...new Set(sauces.filter(s=>p.sauces.includes(s)))].sort(),key=lineKey(id,safe);
  if((lines.find(l=>l.key===key)?.quantity??0)>=20){setNotice('Máximo 20 unidades por selección.');return;}
  setLines(old=>old.some(l=>l.key===key)?old.map(l=>l.key===key?{...l,quantity:Math.min(l.quantity+1,20)}:l):[...old,{key,productId:id,quantity:1,sauces:safe}]);
  setNotice(`${p.name} en tu pedido`);if(button)flyToCart(button);
 },[lines]);
 return <Context.Provider value={{lines,ready,open,setOpen,count:lines.reduce((n,l)=>n+l.quantity,0),add,quantity:(key,n)=>setLines(old=>n<=0?old.filter(l=>l.key!==key):old.map(l=>l.key===key?{...l,quantity:Math.min(Math.max(Math.floor(n),1),20)}:l)),clear:()=>setLines([]),notice}}>{children}<div role="status" aria-live="polite" className={`toast ${notice?'visible':''}`}>{notice}</div></Context.Provider>;
}
export function useCart(){const state=useContext(Context);if(!state)throw Error('CartProvider is required');return state;}
