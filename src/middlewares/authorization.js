
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo contiene un middleware que controla
los permisos de los usuarios.

Se encarga de:
- Comprobar si el usuario inició sesión.
- Verificar si su rol es "admin".
- Permitir o rechazar el acceso a operaciones
  que requieren permisos de administrador.

Este middleware trabaja junto con authentication.js,
que verifica previamente el token JWT.
====================================================
*/


// ==================================================
// VERIFICAR PERMISOS DE ADMINISTRADOR
// ==================================================

// esta función comprueba si el usuario autenticado tiene el rol de administrador.
export const verificarAdmin = (req, res, next) => {

    // comprobamos si existe un usuario autenticado y si su rol es "admin".
    if (!req.usuario || req.usuario.rol !== "admin") {

        // si no tiene permisos, rechazamos la solicitud.
        return res.status(403).json({
            mensaje: "No tenés permisos para realizar esta operación"
        });
    }

    // si es administrador, permitimos continuar.
    next();
};



