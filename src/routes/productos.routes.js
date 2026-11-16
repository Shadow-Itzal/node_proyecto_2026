
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo define las rutas que permiten
realizar operaciones sobre los productos.

Se encarga de:
- Permitir consultas públicas de productos.
- Proteger las operaciones de creación,
  modificación y eliminación.
- Verificar que solamente un administrador
  pueda realizar esas operaciones.

Las operaciones serán:
- GET: consultar todos los productos.
- GET: consultar un producto por su ID.
- POST: crear un producto.
- PUT: actualizar un producto.
- DELETE: eliminar un producto.
====================================================
*/

// importamos Router desde Express para crear las rutas de productos.
import { Router } from "express";

// importamos los controladores de productos.
import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.controller.js";

// importamos el middleware que verifica si el usuario tiene un token válido.
import { verificarToken } from "../middlewares/authentication.js";

// importamos el middleware que verifica si el usuario tiene permisos de administrador.
import { verificarAdmin } from "../middlewares/authorization.js";

// creamos el enrutador.
const router = Router();


// ==================================================
// RUTAS PÚBLICAS
// ==================================================

// consultar todos los productos.
// no requiere iniciar sesión.
router.get("/", obtenerProductos);

// consultar un producto por su ID.
// no requiere iniciar sesión.
router.get("/:id", obtenerProductoPorId);


// ==================================================
// RUTAS PROTEGIDAS
// ==================================================

// crear un producto.
// primero verificamos el token y después comprobamos que el usuario sea administrador.
router.post("/", verificarToken, verificarAdmin, crearProducto);

// actualizar un producto.
// Solamente puede hacerlo un administrador.
router.put("/:id", verificarToken, verificarAdmin, actualizarProducto);

// eliminar un producto.
// Solamente puede hacerlo un administrador.
router.delete("/:id", verificarToken, verificarAdmin, eliminarProducto);


// exportamos las rutas para utilizarlas desde el archivo principal index.js.
export default router;



