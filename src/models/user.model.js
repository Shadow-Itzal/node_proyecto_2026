/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo se comunica directamente con Firebase
para realizar las operaciones relacionadas con
los usuarios.

Se encarga de:
- Buscar un usuario por su correo electrónico.
- Crear un nuevo usuario.
- Asignar automáticamente el rol de usuario.

Por seguridad, los registros nuevos siempre tendrán
el rol "usuario".
====================================================
*/

// importamos las funciones de Firebase necesarias para consultar y guardar usuarios.
import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";

// importamos la conexión con Firestore.
import { db } from "../config/firebase.js";


// ==================================================
// COLECCIÓN DE USUARIOS
// ==================================================

// indicamos que trabajaremos con la colección "users" dentro de nuestra base de datos Firestore.
const usuariosColeccion = collection(db, "users");


// ==================================================
// BUSCAR USUARIO POR CORREO
// ==================================================

// esta función busca si existe un usuario registrado con el correo electrónico recibido.
export const findByEmail = async (email) => {

    // creamos una consulta para buscar coincidencias en el campo email.
    const consulta = query(
        usuariosColeccion,
        where("email", "==", email)
    );

    // ejecutamos la consulta en Firebase.
    const resultado = await getDocs(consulta);

    // si no encontramos coincidencias, devolvemos null.
    if (resultado.empty) {
        return null;
    }

    // obtenemos el primer usuario encontrado.
    const documentoUsuario = resultado.docs[0];

    // devolvemos el ID y los datos del usuario.
    return {
        id: documentoUsuario.id,
        ...documentoUsuario.data()
    };
};


// ==================================================
// CREAR USUARIO
// ==================================================

// esta función guarda un usuario nuevo en Firebase.
// recibe su correo y su contraseña ya encriptada.
export const create = async ({ email, password }) => {

    // guardamos los datos del usuario en Firestore.
    // el rol se establece desde el servidor y no se recibe desde el formulario de registro.
    const nuevoUsuario = {
        email,
        password,
        rol: "usuario"
    };

    // agregamos el documento a la colección.
    const referenciaUsuario = await addDoc(
        usuariosColeccion,
        nuevoUsuario
    );

    // devolvemos los datos del usuario creado.
    return {
        id: referenciaUsuario.id,
        ...nuevoUsuario
    };
};




