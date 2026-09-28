# Swag-Labs-Copia

SauceDemo es una página web de demostración que simula una tienda en línea. Permite iniciar sesión, ver productos, agregarlos al carrito y realizar una compra ficticia. Se utiliza principalmente para practicar pruebas de software y automatización web y nosotros replicamos la pagina.

Réplica de [SauceDemo](https://www.saucedemo.com/) hecha con HTML, CSS y JavaScript puro.

## Estructura
- `index.html` — página de login
- `inventory.html` — listado de productos (tras login)
- `cart.html` — carrito de compras
- `checkout-step-one.html` — formulario de información del checkout
- `checkout-step-two.html` — resumen del pedido (overview)
- `checkout-complete.html` — confirmación final del pedido
- `style.css` — estilos de todas las páginas
- `script.js` — lógica del login
- `inventory.js` — lógica del inventario y carrito
- `cart.js` — lógica de la página del carrito
- `checkout.js` — lógica de los 3 pasos del checkout

## Usuarios de prueba
| Usuario | Contraseña |
|---|---|
| standard_user | secret_sauce |
| locked_out_user | secret_sauce |
| problem_user | secret_sauce |
| performance_glitch_user | secret_sauce |
| error_user | secret_sauce |
| visual_user | secret_sauce |

## Flujo completo
1. Login (`index.html`) con `standard_user` / `secret_sauce`
2. Ver productos y agregarlos al carrito (`inventory.html`)
3. Revisar carrito (`cart.html`)
4. Completar información de envío (`checkout-step-one.html`)
5. Revisar resumen y total con impuestos (`checkout-step-two.html`)
6. Confirmación del pedido (`checkout-complete.html`)

## Cómo usar
Abre `index.html` con la extensión "Live Server" en VS Code.
