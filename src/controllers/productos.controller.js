/*
====================================
PARA QUE SIRVE?
Contiene las funciones que reciben y procesan 
las solicitudes relacionadas con los productos.

Se comunica con los servicios para realizar
las operaciones de devuelve las respuestas al cliente.

Las operaciones son:
- Obtener todos los productos.
- Obtener un producto por su ID.
- Crear un producto.
- Actualizar un producto.
- Eliminar un producto.
====================================
*/

// importamos los servicios de productos.
// el controlador delega en ellos las operaciones relacionadas con los datos.
import * as productosService from "../services/productos.service.js";


// ====================================
// OBTENER TODOS LOS PRODUCTOS
// ====================================

export const obtenerProductos = async (req, res) => {
    try {
        // solicitamos al servicio la lista de productos
        const productos = await productosService.obtenerProductos();

        // respondemos con estado 200 (OK) y la lista de productos en formato JSON
        res.status(200).json(productos);

    } catch (error) {
        // si ocurre un error, lo mostramos en la terminal
        console.error("Error al obtener productos:", error);

        // respondemos con estado 500 (error del servidor)
        res.status(500).json({ 
            message: "Error al obtener productos" 
        });
    }
}


// ====================================
// OBTENER UN PRODUCTO POR SU ID
// ====================================

export const obtenerProductoPorId = async (req, res) => {
    try {
        // obtenemos el ID que viene en la dirección URL
        const id = req.params.id;

        // solicitamos al servicio el producto correspondiente a ese ID
        const producto = await productosService.obtenerProductoPorId(id);

        // si no existe, respondemos con estado 404 (no encontrado)
        if (!producto) {
            return res.status(404).json({ 
                message: "Producto no encontrado" 
            });
        }

        // si existe,respondemos con estado 200 (OK) y el producto en formato JSON
        res.status(200).json(producto);

    } catch (error) {

        console.error("Error al obtener producto:", error);

        res.status(500).json({ 
            message: "Error al obtener producto" 
        });
    }
}


// ====================================
// CREAR UN PRODUCTO
// ====================================

export const crearProducto = async (req, res) => {
    try {
        // obtenemos los datos enviados en el cuerpo de la solicitud (req.body)
        const datosProducto = req.body;

        // enviamos los datos al servicio para crear el nuevo producto
        const nuevoProducto = await productosService.crearProducto(datosProducto);

        // respondemos con estado 201 (creado) y el nuevo producto en formato JSON
        res.status(201).json({
            message: "Producto creado exitosamente",
            producto: nuevoProducto
        });

    } catch (error) {
        
        console.error("Error al crear producto:", error);

        res.status(500).json({ 
            message: "Error al crear producto" 
        });
    }
}


// ====================================
// ACTUALIZAR UN PRODUCTO
// ====================================

export const actualizarProducto = async (req, res) => {
    try {
        // obtenemos el ID del producto a actualizar desde la URL
        const id = req.params.id;

        // obtenemos los nuevos datos enviados en la solicitud
        const datosProducto = req.body;

        // solicitamos al servicio que actualice el producto
        const productoActualizado = await productosService.actualizarProducto(id, datosProducto);

        // si no existe, respondemos con estado 404
        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        // si se actualizó correctamente, respondemos con 200
        res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            producto: productoActualizado
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);

        res.status(500).json({ 
            message: "Error al actualizar producto" 
        });
    }
    
}


// ====================================
// ELIMINAR UN PRODUCTO
// ====================================

export const eliminarProducto = async (req, res) => {
    try {
        // obtenemos el ID del producto desde la URL
        const id = req.params.id;
        
        // solicitamos al servicio que elimine el producto
        const productoEliminado = await productosService.eliminarProducto(id);
        
        // si no existe, respondemos con estado 404
        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }
    
        // si se eliminó correctamente, respondemos con 200
        res.status(200).json({
            mensaje: "Producto eliminado correctamente",
        });
    
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    
        res.status(500).json({ 
            message: "Error al eliminar producto" 
        });
    }
};



