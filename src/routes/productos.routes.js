/*
====================================
PARA QUE SIRVE?
Define las rutas o direcciones que permiten 
realizar operaciones sobre productos.

Cada ruta recibe una solicitud HTTP y 
la deriva al controlador correspondiente para procesarla.

Las operaciones serán:
- GET: Consultar todos los productos.
- GET: Consultar un producto específico por su ID.
- POST: Crear un nuevo producto.
- PUT: Actualizar un producto existente por su ID.
- DELETE: Eliminar un producto por su ID.
====================================
*/

// importamos Router desde Express para crear un grupo de rutas independientes
import { Router } from "express";

// importamos las funciones del controlador.
// cada función maneja la lógica de una operación específica sobre productos.
import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.controller.js";

// creamos nuestro enrutador
const router = Router();

// ====================================
// RUTAS DE PRODUCTOS
// ====================================

// GET: Obtener todos los productos.
router.get(`/`, obtenerProductos);

// GET: Obtener un producto específico por su ID.
router.get(`/:id`, obtenerProductoPorId);

// POST: Crear un nuevo producto.
router.post(`/`, crearProducto);

// PUT: Actualizar un producto existente por su ID.
router.put(`/:id`, actualizarProducto);

// DELETE: Eliminar un producto por su ID.
router.delete(`/:id`, eliminarProducto);

// exportamos el enrutador para utilizarlo desde nuestro archivo principal (index.js)
export default router;

