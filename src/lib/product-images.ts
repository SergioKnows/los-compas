import type {StaticImageData} from 'next/image';
import sencillo from '@/assets/productos/sencillo.webp';
import planchaEntero from '@/assets/productos/plancha-entero.webp';
import planchaCortado from '@/assets/productos/plancha-cortado.webp';
export type ProductImage={src:StaticImageData;alt:string};
// Separado de catalog.ts para que los tests en Node no tengan que resolver imágenes.
export const productImages:Record<string,ProductImage[]>={
 sencillo:[{src:sencillo,alt:'Perro sencillo con queso costeño rallado, ensalada y ripio de papas'}],
 plancha:[
  {src:planchaEntero,alt:'Perro a la plancha entero, con el pan dorado y ajonjolí'},
  {src:planchaCortado,alt:'Perro a la plancha cortado por la mitad mostrando el relleno'},
 ],
};
