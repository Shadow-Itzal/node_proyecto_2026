
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo contiene la lógica de autenticación
de los usuarios.

Se encarga de registrar usuarios nuevos, comprobar
si un correo ya está registrado, proteger las
contraseñas y validar los datos al iniciar sesión.

También solicita la generación del token JWT
cuando el usuario inicia sesión correctamente.
====================================================
*/

// importamos bcryptjs para proteger y comparar contraseñas.
import bcrypt from "bcryptjs";

// importamos las funciones del model de usuarios.
import { create, findByEmail } from "../models/user.model.js";

// importamos la función que genera los tokens JWT.
import { generarToken } from "../utils/token-generator.js";


// ==================================================
// REGISTRAR UN USUARIO
// ==================================================

// recibimos el correo y la contraseña del usuario.
export const registrarUsuario = async (email, password) => {

    // eliminamos espacios y convertimos el correo a minúsculas para mantener un formato uniforme.
    const correoNormalizado = email.trim().toLowerCase();

    // comprobamos si el correo ya está registrado.
    const usuarioExistente = await findByEmail(correoNormalizado);

    // si encontramos un usuario, no permitimos registrar nuevamente ese correo.
    if (usuarioExistente) {
        return null;
    }

    // generamos un hash de la contraseña.
    // el número 10 indica el costo de procesamiento.
    const contraseñaHasheada = await bcrypt.hash(password, 10);

    // guardamos el usuario en Firestore.
    const nuevoUsuario = await create({
        email: correoNormalizado,
        password: contraseñaHasheada
    });

    // devolvemos solamente el ID y el correo.
    return {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email
    };
};


// ==================================================
// INICIAR SESIÓN
// ==================================================

// recibimos el correo y la contraseña del usuario.
export const iniciarSesion = async (email, password) => {

    // normalizamos el correo para realizar la búsqueda.
    const correoNormalizado = email.trim().toLowerCase();

    // buscamos al usuario en Firestore.
    const usuario = await findByEmail(correoNormalizado);

    // si no encontramos el usuario, devolvemos null.
    if (!usuario) {
        return null;
    }

    // comparamos la contraseña ingresada con el hash que está almacenado en Firestore.
    const contraseñaValida = await bcrypt.compare(
        password,
        usuario.password
    );

    // si la contraseña no coincide, devolvemos null.
    if (!contraseñaValida) {
        return null;
    }

    // generamos un token con el ID y el correo del usuario autenticado.
    const token = generarToken({
        id: usuario.id,
        email: usuario.email
    });

    // devolvemos el token y los datos del usuario.
    return {
        token,
        usuario: {
            id: usuario.id,
            email: usuario.email
        }
    };
};



