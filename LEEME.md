# Anotador de Truco — cómo subirlo e instalarlo

Esta carpeta es la app lista para publicar. Son 8 archivos y todos van juntos.

| Archivo | Para qué es |
| --- | --- |
| `index.html` | La app. Es la misma de siempre, más los datos de instalación. |
| `manifest.webmanifest` | El nombre, el ícono y los colores que usa el teléfono. |
| `sw.js` | Lo que la hace funcionar sin internet. |
| `icon-192.png`, `icon-512.png` | El ícono. |
| `icon-maskable-512.png` | El ícono recortado en círculo, para Android. |
| `apple-touch-icon.png` | El ícono para iPhone. |
| `LEEME.md` | Esto. No hace falta subirlo, pero no molesta. |

---

## 1. Subirlo a GitHub Pages

Se hace todo desde la web, sin instalar nada.

1. Entrá a **github.com** y creá una cuenta. Es gratis y no pide tarjeta.
2. Arriba a la derecha, **+** → **New repository**.
3. En *Repository name* poné `truco`. Dejá marcado **Public** y tocá **Create repository**.

   > Tiene que ser público. GitHub Pages gratuito no publica repositorios privados.

4. En la página que aparece, hacé clic en **uploading an existing file**.
5. Abrí esta carpeta en tu computadora y arrastrá **los archivos sueltos** a la ventana del navegador.

   > Arrastrá los archivos, no la carpeta. Si subís la carpeta, la dirección te queda con un pedazo de más al final.

6. Abajo, tocá **Commit changes**.
7. Andá a **Settings** (arriba) → **Pages** (en la columna izquierda).
8. En *Source* elegí **Deploy from a branch**. En *Branch* elegí **main** y **/ (root)**. Tocá **Save**.
9. Esperá uno o dos minutos y recargá esa misma página. Arriba te va a aparecer la dirección:

   ```
   https://TU-USUARIO.github.io/truco/
   ```

Esa dirección es la app. Abrila en la computadora para confirmar que carga.

---

## 2. Instalarla en el celular

Mandate el link por WhatsApp a vos mismo y abrilo en el teléfono.

**Android (Chrome)**
Suele aparecer solo un cartel que dice *Instalar app*. Si no sale: menú **⋮** → **Agregar a la pantalla principal** → **Instalar**.

**iPhone (Safari)**
Tiene que ser Safari; desde Chrome en iPhone no se puede instalar. Tocá el botón **Compartir** (el cuadradito con la flecha para arriba) → bajá hasta **Agregar a inicio** → **Agregar**.

Queda el ícono en la pantalla junto con las demás apps. Al abrirlo arranca en pantalla completa, sin la barra de direcciones.

### Qué necesitás en el celular

Nada. No hace falta cuenta, ni Play Store, ni App Store, ni dar permisos. Tampoco pesa casi nada: son unos 70 KB.

La primera vez tiene que haber internet, porque la está bajando. Después abre sin conexión, incluso en modo avión.

Sirve en Android 5 o más nuevo y en iPhone con iOS 11.3 o más nuevo. Cualquier teléfono de los últimos diez años entra.

---

## 3. Si después querés cambiar algo

Entrás al repositorio, tocás el archivo, el lapicito para editar y **Commit changes**. En un minuto se actualiza solo.

En los teléfonos que ya la tienen instalada, el cambio aparece la segunda vez que la abren con internet: la primera muestra la versión guardada y baja la nueva por detrás. No hay que tocar nada más.

En iPhone hay una vuelta de tuerca: si pasan más de 7 días sin abrirla, Safari borra lo guardado por su cuenta y la próxima vez necesita internet. Después vuelve a andar sin conexión. Es una política de Apple; en Android no pasa.

---

## Sobre el costo

GitHub Pages es gratis y sin vencimiento. Los límites son 1 GB de sitio y 100 GB de tráfico por mes; esta app pesa 70 KB, así que no los vas a ver ni de lejos.

La cuenta no caduca por no usarla. Mientras el repositorio exista, la dirección sigue andando.
