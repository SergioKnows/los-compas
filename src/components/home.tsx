import {Bike,MapPin,ArrowUpRight,ShoppingBag,MessageCircle,ArrowRight} from 'lucide-react';
import {Opening} from './opening';
import {Menu} from './menu';
import {WhatsAppLink} from './store-shell';
import {wrap,eyebrow,button,textButton} from './ui';
// Stepper: número en círculo de marca + icono, con línea conectora hacia el siguiente paso (horizontal en desktop, vertical en móvil).
const step="relative max-md:pl-14 [&:not(:last-child)]:md:after:absolute [&:not(:last-child)]:md:after:top-5 [&:not(:last-child)]:md:after:left-[86px] [&:not(:last-child)]:md:after:-right-9 [&:not(:last-child)]:md:after:h-0.5 [&:not(:last-child)]:md:after:bg-line [&:not(:last-child)]:md:after:content-[''] [&:not(:last-child)]:max-md:before:absolute [&:not(:last-child)]:max-md:before:left-5 [&:not(:last-child)]:max-md:before:top-11 [&:not(:last-child)]:max-md:before:-bottom-6 [&:not(:last-child)]:max-md:before:w-0.5 [&:not(:last-child)]:max-md:before:bg-line [&:not(:last-child)]:max-md:before:content-['']";
const stepNumber='grid size-10 shrink-0 place-items-center rounded-full bg-hoja text-[15px] font-bold text-white max-md:absolute max-md:left-0 max-md:top-0';
const stepIcon='text-hoja';
const stepText='max-w-[280px] text-sm leading-[1.7] text-muted max-md:max-w-none';
const detail='flex gap-[18px] border-b border-white/15 pb-[23px] last:border-b-0 last:pb-0 max-md:pb-[21px]';
const detailIcon='mt-0.5 shrink-0 text-mostaza';
const detailText='max-w-[390px] text-[13px] leading-[1.8] text-[#e1e8e2]';
export function Home(){return <main id="contenido">
 <Opening/>
 <Menu/>
 <section className="bg-hoja py-[62px] text-white max-md:py-[42px]" id="domicilios"><div className={`${wrap} grid grid-cols-2 gap-[110px] md:max-lg:gap-[45px] max-md:grid-cols-1 max-md:gap-[35px]`}>
  <div><div className={`${eyebrow} text-hoja-200`}>Cerquita de ti</div><h2 className="mt-[17px] mb-5 text-[45px] font-[750] leading-[1.12] max-md:text-[37px]">El parche llega<br/>a tu casa.</h2><p className="max-w-[390px] text-sm leading-[1.8] text-[#e1e8e2]">Estamos en <strong className="font-semibold">María Auxiliadora, a 5 minutos del CC Mayorca.</strong> Por ahora, nos encuentras por domicilio.</p><WhatsAppLink className={button('yellow','mt-[25px]')}>Consulta tu domicilio <ArrowUpRight size={18}/></WhatsAppLink></div>
  <div className="flex flex-col justify-center gap-[26px] max-md:gap-[22px]">
   <div className={detail}><MapPin size={24} className={detailIcon}/><div><h3 className="mb-1.5 text-base font-bold">Desde María Auxiliadora</h3><p className={detailText}>Nuestro punto de partida para llevarte un buen perro.</p></div></div>
   <div className={detail}><Bike size={26} className={detailIcon}/><div><h3 className="mb-1.5 text-base font-bold">Hasta donde estés</h3><p className={detailText}>Confirmamos cobertura, costo y tiempo de entrega con tu dirección.</p></div></div>
   <div className={detail}><MessageCircle size={24} className={detailIcon}/><div><h3 className="mb-1.5 text-base font-bold">Directo con los compas</h3><p className={detailText}>Tu pedido y todos sus detalles, en una conversación de WhatsApp.</p></div></div>
  </div>
 </div></section>
 <section className={`${wrap} py-[72px] max-md:py-[42px]`}>
  <div className="mb-8 flex items-end justify-between gap-5 max-md:flex-col max-md:items-start max-md:gap-3.5"><div><div className={eyebrow}>Así de sencillo</div><h2 className="mt-3 text-[38px] font-[750] leading-[1.12] max-md:text-[30px]">Del antojo al primer mordisco.</h2></div></div>
  <div className="mt-[35px] mb-[18px] grid grid-cols-3 gap-12 max-md:mt-[27px] max-md:grid-cols-1 max-md:gap-[25px]">
   <div className={step}><div className="mb-4 flex items-center gap-3 max-md:mb-2 max-md:min-h-10"><span className={stepNumber}>1</span><ShoppingBag size={22} className={stepIcon}/></div><h3 className="mb-[9px] text-[17px] font-bold">Arma tu parche</h3><p className={stepText}>Elige tus perros, las salsas y cuántos van a compartir.</p></div>
   <div className={step}><div className="mb-4 flex items-center gap-3 max-md:mb-2 max-md:min-h-10"><span className={stepNumber}>2</span><MapPin size={22} className={stepIcon}/></div><h3 className="mb-[9px] text-[17px] font-bold">Dinos dónde</h3><p className={stepText}>Completa tu nombre, dirección y los detalles del pedido.</p></div>
   <div className={step}><div className="mb-4 flex items-center gap-3 max-md:mb-2 max-md:min-h-10"><span className={stepNumber}>3</span><MessageCircle size={22} className={stepIcon}/></div><h3 className="mb-[9px] text-[17px] font-bold">Hablemos por WhatsApp</h3><p className={stepText}>Confirma el total, la forma de pago y tu domicilio con nosotros.</p></div>
  </div>
  <a className={textButton} href="#menu">Vamos por ese perro <ArrowRight size={17}/></a>
 </section>
</main>;}
