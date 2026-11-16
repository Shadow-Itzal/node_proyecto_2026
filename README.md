# Proyecto Final Node.js 2026

## Configuración del proyecto

- name: Nombre del proyecto.
- version: Versión inicial.
- main: Archivo principal de la aplicación.
- type: module, permite utilizar import y export.
- star: Comando para iniciar el servidor.
- dev: Inicia el servidor y lo reinicia cuando detecta cambios.
- author: autor del proyecto.
- license: Licencia MIT.

## Dependencias

- express: Servidor y rutas.
- cors: Permite solicitudes desde otros orígenes.
- body-parser: Interpreta los datos de las peticiones.
- dotenv: Lee variables de entorno.
- firebase: Conexión con Firestore.


## Rutas conectadas
Método  |	Dirección           |	Función
------  | -------------------   | -----------------
GET	    |         /	            |   Mensaje de bienvenida
GET	    | /api/products         |	Obtener productos
GET	    | /api/products/:id     |	Obtener un producto
POST	| /api/products/create  |	Crear producto
PUT	    | /api/products/:id     |	Actualizar producto
DELETE  | /api/products/:id     |	Eliminar producto
POST    | /auth/register        |	Registrar usuario
POST    | /auth/login           |	Iniciar sesión

