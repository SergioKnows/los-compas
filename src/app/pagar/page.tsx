import type {Metadata} from 'next';
import {Checkout} from '@/components/checkout';
export const metadata:Metadata={title:'Tu pedido y pagos',description:'Revisa tu pedido de Los Compas, completa tu dirección y confirma los detalles por WhatsApp.',robots:{index:false,follow:true}};
export default function Page(){return <Checkout/>;}
