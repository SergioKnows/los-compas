import type { Metadata } from 'next';
import './globals.css';
import {CartProvider} from '@/components/cart-provider';
import {Header,Footer} from '@/components/store-shell';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://127.0.0.1:3000'),
  title: { default: 'Los Compas | El parche del buen perro', template: '%s | Los Compas' },
  description: 'Perros calientes y domicilios desde María Auxiliadora, a 5 minutos del CC Mayorca. Conoce el menú de Los Compas y nuestra próxima apertura.',
  icons: { icon: '/brand/favicon.svg' },
  openGraph: {title:'Los Compas | Abrimos el 2 de octubre',description:'El parche del buen perro. Domicilios desde María Auxiliadora, cerca del CC Mayorca.',locale:'es_CO',type:'website',images:[{url:'/brand/social.png',width:1200,height:630,alt:'Los Compas. El parche del buen perro'}]},
  twitter: {card:'summary_large_image',title:'Los Compas | El parche del buen perro',images:['/brand/social.png']},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="es-CO"><body><CartProvider><Header/>{children}<Footer/></CartProvider></body></html>;
}
