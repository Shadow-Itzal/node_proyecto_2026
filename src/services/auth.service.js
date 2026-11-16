
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo contiene la lógica relacionada con
el registro y el inicio de sesión de los usuarios.

Se encarga de:
- Normalizar los correos electrónicos.
- Comprobar si un usuario ya está registrado.
- Encriptar las contraseñas.
- Verificar las credenciales al iniciar sesión.
- Generar un token JWT con los datos del usuario
  y su rol.
====================================================
*/

// importamos bcryptjs para encriptar y comparar las contraseñas de los usuarios.
import bcrypt from "bcryptjs";

// importamos las funciones del modelo de usuarios.
import {
    create,
    findByEmail
} from "../models/user.model.js";

// importamos la función que genera los tokens JWT.
import { generarToken } from "../utils/token-generator.js";


// ==================================================
// REGISTRAR USUARIO
// ==================================================

// esta función registra un usuario nuevo.
export const registrarUsuario = async (email, password) => {

    // normalizamos el correo para evitar diferencias entre mayúsculas, minúsculas y espacios.
    const correoNormalizado = email.trim().toLowerCase();

    // buscamos si ya existe un usuario con ese correo.
    const usuarioExistente = await findByEmail(correoNormalizado);

    // si el usuario existe, devolvemos null.
    if (usuarioExistente) {
        return null;
    }

    // encriptamos la contraseña utilizando bcrypt.
    const contraseñaHasheada = await bcrypt.hash(password, 10);

    // creamos el usuario en Firebase.
    // el modelo asignará automáticamente el rol "usuario".
    const nuevoUsuario = await create({
        email: correoNormalizado,
        password: contraseñaHasheada
    });

    // devolvemos los datos del usuario sin incluir su contraseña en la respuesta.
    return {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
    };
};


// ==================================================
// INICIAR SESIÓN
// ==================================================

// esta función verifica las credenciales del usuario y genera un token JWT si son correctas.
export const iniciarSesion = async (email, password) => {

    // normalizamos el correo electrónico.
    const correoNormalizado = email.trim().toLowerCase();

    // buscamos al usuario en Firebase.
    const usuario = await findByEmail(correoNormalizado);

    // si no existe, devolvemos null.
    if (!usuario) {
        return null;
    }

    // comparamos la contraseña ingresada con el hash almacenado en Firebase.
    const contraseñaValida = await bcrypt.compare(
        password,
        usuario.password
    );

    // si la contraseña no coincide, devolvemos null.
    if (!contraseñaValida) {
        return null;
    }

    // generamos el token incluyendo el ID, el correo electrónico y el rol del usuario.
    const token = generarToken({
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
    });

    // devolvemos el token y los datos del usuario.
    return {
        token,
        usuario: {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        }
    };
};


