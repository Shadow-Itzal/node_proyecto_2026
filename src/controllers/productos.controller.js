/*
====================================
PARA QUE SIRVE?
Contiene las funciones que reciben y procesan 
las solicitudes relacionadas con los productos.

Se comunica con los servicios para realizar
las operaciones y devuelve las respuestas al cliente.

Las operaciones son:
- Obtener todos los productos.
- Obtener un producto por su ID.
- Crear un producto.
- Actualizar un producto.
- Eliminar un producto.

También valida los datos recibidos para evitar
guardar información incorrecta.
====================================
*/

// importamos los servicios de productos.
// el controlador delega en ellos las operaciones relacionadas con los datos.
import * as productosService from "../services/productos.service.js";


// ====================================
// VALIDAR LOS DATOS DE UN PRODUCTO
// ====================================

// esta función comprueba que los campos enviados tengan el tipo de dato correcto.

// los cuatro campos son opcionales.
// pero si se envían, deben cumplir las reglas.

// devuelve un mensaje si encuentra un error.
// si todos los datos son válidos, devuelve null.

const validarDatosProducto = (datosProducto) => {

    // definimos los únicos campos permitidos para un producto.
    const camposPermitidos = [
        "nombre",
        "precio",
        "stock",
        "categoria"
    ];

    // buscamos si se recibió algún campo que no esté permitido.
    const campoNoPermitido = Object.keys(datosProducto).find(
        (campo) => !camposPermitidos.includes(campo)
    );

    // si encontramos un campo desconocido, devolvemos un error.
    if (campoNoPermitido) {
        return `El campo ${campoNoPermitido} no está permitido`;
    }

    // comprobamos el nombre, si fue enviado.
    if ("nombre" in datosProducto) {
        if (
            typeof datosProducto.nombre !== "string" ||
            datosProducto.nombre.trim() === ""
        ) {
            return "El nombre debe ser un texto";
        }
    }

    // comprobamos el precio, si fue enviado.
    if ("precio" in datosProducto) {
        if (
            typeof datosProducto.precio !== "number" ||
            !Number.isInteger(datosProducto.precio) ||
            datosProducto.precio < 0
        ) {
            return "El precio debe ser un número entero igual o mayor que cero";
        }
    }

    // comprobamos el stock, si fue enviado.
    if ("stock" in datosProducto) {
        if (
            typeof datosProducto.stock !== "number" ||
            !Number.isInteger(datosProducto.stock) ||
            datosProducto.stock < 0
        ) {
            return "El stock debe ser un número entero igual o mayor que cero";
        }
    }

    // comprobamos la categoría, si fue enviada.
    if ("categoria" in datosProducto) {
        if (
            typeof datosProducto.categoria !== "string" ||
            datosProducto.categoria.trim() === ""
        ) {
            return "La categoría debe ser un texto";
        }
    }

    // si no encontramos errores, devolvemos null.
    return null;
};


// ====================================
// OBTENER TODOS LOS PRODUCTOS
// ====================================

export const obtenerProductos = async (req, res) => {
    try {
        // solicitamos al servicio la lista de productos
        const productos = await productosService.obtenerProductos();

        // respondemos con estado 200 (OK) y la lista de productos en formato JSON
        return res.status(200).json(productos);

    } catch (error) {
        // si ocurre un error, lo mostramos en la terminal
        console.error("Error al obtener productos:", error);

        // respondemos con estado 500 (error del servidor)
        return res.status(500).json({ 
            mensaje: "Error al obtener productos" 
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
                mensaje: "Producto no encontrado" 
            });
        }

        // si existe,respondemos con estado 200 (OK) y el producto en formato JSON
        return res.status(200).json(producto);

    } catch (error) {

        console.error("Error al obtener producto:", error);

        return res.status(500).json({ 
            mensaje: "Error al obtener producto" 
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

        // comprobamos que se hayan recibido datos.
        if (
            !datosProducto ||
            typeof datosProducto !== "object" ||
            Array.isArray(datosProducto) ||
            Object.keys(datosProducto).length === 0
        ) {
            return res.status(400).json({
                mensaje: "Debe enviar los datos del producto"
            });
        }

        // validamos los campos que fueron enviados
        const errorValidacion = validarDatosProducto(datosProducto);

        // si algún dato no cumple las reglas, respondemos con 422
        if (errorValidacion) {
            return res.status(422).json({
                mensaje: errorValidacion
            });
        }

        // enviamos los datos al servicio para crear el nuevo producto
        const nuevoProducto = await productosService.crearProducto(datosProducto);

        // respondemos con estado 201 (creado) y el nuevo producto en formato JSON
        return res.status(201).json({
            mensaje: "Producto creado exitosamente",
            producto: nuevoProducto
        });

    } catch (error) {
        
        console.error("Error al crear producto:", error);

        return res.status(500).json({ 
            mensaje: "Error al crear producto" 
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

        // comprobamos que se hayan recibido datos
        if (
            !datosProducto ||
            typeof datosProducto !== "object" ||
            Array.isArray(datosProducto) ||
            Object.keys(datosProducto).length === 0
        ) {
            return res.status(400).json({
                mensaje: "Debe enviar los datos para actualizar el producto"
            });
        }

        // validamos solamente los campos que fueron enviados.
        const errorValidacion = validarDatosProducto(datosProducto);

        // si algún campo no cumple las reglas, respondemos con 422.
        if (errorValidacion) {
            return res.status(422).json({
                mensaje: errorValidacion
            });
        }

        // solicitamos al servicio que actualice el producto
        const productoActualizado = await productosService.actualizarProducto(id, datosProducto);

        // si no existe, respondemos con estado 404
        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        // si se actualizó correctamente, respondemos con 200
        return res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            producto: productoActualizado
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);

        return res.status(500).json({ 
            mensaje: "Error al actualizar producto" 
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
        return res.status(200).json({
            mensaje: "Producto eliminado correctamente",
        });
    
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    
        return res.status(500).json({ 
            mensaje: "Error al eliminar producto" 
        });
    }
};



