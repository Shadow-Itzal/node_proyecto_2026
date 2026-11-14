
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo se encarga de trabajar directamente
con la colección "users" de nuestra base de datos
Firestore.

Contiene las funciones para buscar usuarios por
su correo electrónico y registrar usuarios nuevos.

Las contraseñas que recibe deben estar previamente
protegidas mediante un hash generado con bcryptjs.
====================================================
*/

// importamos las funciones necesarias de Firestore.
import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";

// importamos la conexión con nuestra base de datos.
import { db } from "../config/firebase.js";


// ==================================================
// REFERENCIA A LA COLECCIÓN DE USUARIOS
// ==================================================

// indicamos que vamos a trabajar con la colección llamada "users" dentro de nuestra base de datos.
const usuariosColeccion = collection(db, "users");


// ==================================================
// BUSCAR UN USUARIO POR SU CORREO ELECTRÓNICO
// ==================================================

// buscamos en Firestore un usuario que tenga el correo electrónico recibido como parámetro.
export const findByEmail = async (email) => {

    // creamos una consulta para buscar coincidencias en el campo "email" de la colección.
    const consulta = query(
        usuariosColeccion,
        where("email", "==", email)
    );

    // ejecutamos la consulta en Firestore.
    const resultado = await getDocs(consulta);

    // si no encontramos ningún usuario, devolvemos null.
    if (resultado.empty) {
        return null;
    }

    // obtenemos el primer documento encontrado.
    const documentoUsuario = resultado.docs[0];

    // devolvemos el ID del documento junto con sus datos.
    return {
        id: documentoUsuario.id,
        ...documentoUsuario.data()
    };
};


// ==================================================
// REGISTRAR UN USUARIO NUEVO
// ==================================================

// recibimos el correo electrónico y la contraseña, previamente protegida con bcryptjs.
export const create = async ({ email, password }) => {

    // guardamos los datos del usuario en Firestore.
    const nuevoUsuario = await addDoc(
        usuariosColeccion,
        {
            email,
            password
        }
    );

    // devolvemos los datos del usuario creado, incluyendo el ID generado por Firestore.
    return {
        id: nuevoUsuario.id,
        email,
        password
    };
};


