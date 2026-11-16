/*
====================================
PARA QUE SIRVE?
Este archivo contiene la lógica de los servicios relacionados con los productos.

Su función es comunicar el controller con el model,
delegando en este último las operaciones sobre la BD.

De esta manera, el controller no necesita conocer
cómo se guardan o recuperan los productos.
====================================
*/

// importamos todas las funciones del model de productos
import * as productosModel from "../models/productos.model.js";


// ====================================
// OBTENER TODOS LOS PRODUCTOS
// ====================================

// solicitamos al model la lista completa de productos
export const obtenerProductos = () => {
    return productosModel.obtenerTodos();
};

// ====================================
// OBTENER UN PRODUCTO POR SU ID
// ====================================

// enviamos el ID al model para buscar un producto
export const obtenerProductoPorId = (id) => {
    return productosModel.obtenerPorId(id);
};


// ====================================
// CREAR UN PRODUCTO
// ====================================

// enviamos los datos del nuevo producto al model
export const crearProducto = (datosProducto) => {
    return productosModel.crear(datosProducto);
};


// ====================================
// ACTUALIZAR UN PRODUCTO
// ====================================

// enviamos el ID y los nuevos datos al model
export const actualizarProducto = (id, datosProducto) => {
    return productosModel.actualizar(id, datosProducto);
};


// ====================================
// ELIMINAR UN PRODUCTO
// ====================================

// enviamos el ID al model para eliminar el producto
export const eliminarProducto = (id) => {
    return productosModel.eliminar(id);
};




