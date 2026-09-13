// Clases Tailwind compartidas entre componentes. Se concatenan como strings para no duplicar utilidades largas.
export const wrap='mx-auto w-full max-w-[1208px] px-6 max-md:px-[18px]';
export const eyebrow="flex items-center gap-[9px] text-xs font-bold uppercase text-hoja before:size-[7px] before:rounded-full before:bg-current before:content-['']";
export const iconButton='relative inline-flex items-center justify-center rounded-full border border-line bg-white';
export const textButton='inline-flex items-center justify-start gap-2 py-2.5 text-[13px] font-bold hover:text-tomate-700';
// Tailwind v4 anima translate/scale/rotate como propiedades CSS propias (no "transform"),
// así que transition-property debe listarlas por su nombre real o el movimiento no transiciona.
const buttonBase='inline-flex min-h-[50px] items-center justify-center gap-3 rounded-md px-[22px] py-[13px] text-sm font-bold transition-[background-color,translate] duration-200 motion-safe:hover:-translate-y-0.5';
const variants={
 primary:'bg-tomate-600 text-white hover:bg-tomate-800',
 yellow:'bg-mostaza text-carbon',
 whatsapp:'bg-hoja text-white hover:bg-hoja-700',
 text:'px-2 hover:text-tomate',
};
export const button=(variant:keyof typeof variants,extra='')=>`${buttonBase} ${variants[variant]} ${extra}`.trim();
export const overlay='fixed inset-0 z-[60] bg-[#19251e55] backdrop-blur-[3px] motion-safe:animate-fade';
export const dialog='fixed left-1/2 top-1/2 z-[70] max-h-[calc(100dvh-40px)] w-[min(520px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white p-8 shadow-[0_24px_80px_#0002] motion-safe:animate-fade max-md:p-[25px]';
// No reutiliza iconButton: su "relative" le gana en cascada a "absolute" y el botón deja de anclarse a la esquina.
export const dialogClose='absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-line bg-white shadow-[0_2px_8px_#0002]';
export const dialogTitle='mt-6 mb-[13px] max-w-[90%] text-[29px] font-bold leading-[1.1] max-md:text-[27px]';
export const dialogText='text-sm leading-[1.7] text-muted max-md:text-[13px]';
export const productNumber='inline-grid size-[38px] shrink-0 place-items-center rounded-full border border-carbon/15 text-sm font-bold';
export const tone={yellow:{strip:'bg-mostaza-50',badge:'bg-mostaza-100',add:'bg-mostaza'},green:{strip:'bg-hoja-50',badge:'bg-hoja-50',add:'bg-hoja text-white'}};
