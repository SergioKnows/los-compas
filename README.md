# Los Compas

Sitio en Next.js App Router, TypeScript, Tailwind CSS 4 y pnpm. Usa la identidad V1 sin el banner de domicilios generado posteriormente.

## Ejecutar

```sh
pnpm install
pnpm dev --port 3010
```

```sh
pnpm typecheck
pnpm test
pnpm build
pnpm start --port 3010
```

## Contenido

- `/`: apertura el viernes 2 de octubre de 2026, menú, domicilios y ubicación.
- `/pagar`: resumen editable, datos de entrega, mensaje de WhatsApp e información de pagos.
- Carrito lateral accesible con Radix Dialog, persistencia local validada y selección de salsas por perro.
- Animación hacia la posición real del carrito, sin animación cuando el usuario prefiere movimiento reducido.
- El envío abre un mensaje en WhatsApp. No lo envía automáticamente ni marca el pedido como confirmado o pagado. No borra el carrito al abrir el chat.

## Editar datos

`src/lib/catalog.ts` contiene los dos productos, precios numéricos en COP, ingredientes, salsas y datos del negocio. `.env.example` documenta el teléfono, la fecha y el origen público. Las variables `NEXT_PUBLIC_*` se incluyen en la compilación: recompilar cuando cambien.

El número provisional es 573113146359. El costo/cobertura del domicilio y los medios de pago se confirman por WhatsApp. No se reutilizaron cuentas, QR, políticas ni datos privados de maria-makeup. Los campos bancarios opcionales solo se muestran cuando se completan con datos de Los Compas.

La fecha marca el día de apertura en Colombia; no se anuncia una hora de atención porque aún no está definida. Actualizar el texto previo a la apertura en `src/components/menu.tsx` cuando corresponda.

## Assets

`public/brand` contiene copias de los SVG originales de `C:/Users/ReconVZ/Documents/los-compas-identidad`. No se redibujaron personajes. No hay fotografías inventadas de los productos.

## Privacidad y alcance

Solo las selecciones del carrito se guardan en localStorage. Los datos personales del formulario permanecen en memoria y se incorporan al enlace de WhatsApp cuando el cliente decide continuar. No hay servidor de pedidos, cobro electrónico, analítica ni cuentas de usuario.

Proyecto Next.js estándar, preparado para un alojamiento compatible con Node/Next.js. Configurar `NEXT_PUBLIC_SITE_URL` con el dominio real antes de publicar para generar enlaces sociales correctos. No se ha publicado un dominio ni se ha enviado ningún pedido real.
