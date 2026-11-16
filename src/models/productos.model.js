/*
====================================
PARA QUE SIRVE?
Este archivo contiene las funciones que trabajan
directamente con la BD Firestore.

Se encarga de consultar, crear, actualizar
y eliminar productos.

Recibe las solicitudes del service y se comunica
con Firebase para realizar las operaciones.
====================================
*/

// importamos la conexión con nuestra BD.
import { db } from "../config/firebase.js";

// importamos las funciones necesarias de Firestore
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";


// ========================================
//  REFERENCIA A LA COLECCIÓN DE PRODUCTOS
// ========================================

// indicamos que vamos a trabajar con la colección
// llamada "productos" dentro de nuestra BD
const productosColeccion = collection(db, "productos");


// ====================================
//  OBTENER TODOS LOS PRODUCTOS
// ====================================

// consultamos todos los documentos de la colección
export const obtenerTodos = async () => {
    const consulta = await getDocs(productosColeccion);

    // recorremos los documentos y obtenemos sus datos
    const productos = consulta.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
    }));

    return productos;
};

// ====================================
//  OBTENER UN PRODUCTO POR SU ID
// ====================================

// buscamos un producto utilizando su ID.
export const obtenerPorId = async (id) => {

    // obtenemos la referencia al documento solicitado.
    const referenciaProducto = doc(db, "productos", id);

    // consultamos el documento en Firestore.
    const consulta = await getDoc(referenciaProducto);

    // si el producto no existe, devolvemos null.
    if (!consulta.exists()) {
        return null;
    }

    // devolvemos el ID junto con los datos del producto.
    return {
        id: consulta.id,
        ...consulta.data()
    };
};


// ====================================
//  CREAR UN PRODUCTO
// ====================================

// guardamos un nuevo producto en Firestore.
export const crear = async (datosProducto) => {

    // agregamos un documento nuevo a la colección.
    const nuevoDocumento = await addDoc(
        productosColeccion,
        datosProducto
    );

    // devolvemos el producto creado junto con su ID.
    return {
        id: nuevoDocumento.id,
        ...datosProducto
    };
};


// ====================================
//  ACTUALIZAR UN PRODUCTO
// ====================================

// modificamos los datos de un producto existente.
export const actualizar = async (id, datosProducto) => {

    // obtenemos la referencia al documento que queremos modificar.
    const referenciaProducto = doc(db, "productos", id);

    // comprobamos que el producto exista.
    const consulta = await getDoc(referenciaProducto);

    // si no existe, devolvemos null.
    if (!consulta.exists()) {
        return null;
    }

    // actualizamos los datos del producto.
    await updateDoc(referenciaProducto, datosProducto);

    // volvemos a consultar el documento para obtener sus datos actualizados.
    const productoActualizado = await getDoc(referenciaProducto);

    return {
        id: productoActualizado.id,
        ...productoActualizado.data()
    };
};


// ====================================
//  ELIMINAR UN PRODUCTO
// ====================================

// eliminamos un producto utilizando su ID.
export const eliminar = async (id) => {

    // obtenemos la referencia al documento.
    const referenciaProducto = doc(db, "productos", id);

    // comprobamos que el producto exista.
    const consulta = await getDoc(referenciaProducto);

    // si no existe, devolvemos false.
    if (!consulta.exists()) {
        return false;
    }

    // eliminamos el documento de Firestore.
    await deleteDoc(referenciaProducto);

    // indicamos que la eliminación se realizó correctamente.
    return true;
};


