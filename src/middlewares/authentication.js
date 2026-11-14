
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo contiene un middleware que verifica
la autenticación de los usuarios mediante tokens JWT.

Se encarga de:
- Comprobar que la solicitud tenga un token.
- Verificar que el token sea válido.
- Obtener los datos del usuario incluidos en él.
- Permitir continuar si la autenticación es correcta.

Si el token falta o no es válido, se rechaza
la solicitud.
====================================================
*/

// importamos jsonwebtoken para poder verificar la validez de los tokens JWT.
import jwt from "jsonwebtoken";

// ==================================================
// MIDDLEWARE DE AUTENTICACIÓN
// ==================================================

// esta función se ejecuta antes de llegar al controlador de una ruta protegida.
export const verificarToken = (req, res, next) => {
    try {
        // obtenemos el encabezado Authorization enviado en la solicitud.
        const encabezado = req.headers.authorization;

        // comprobamos que exista el encabezado y que comience con la palabra Bearer.
        if (!encabezado || !encabezado.startsWith("Bearer ")) {
            return res.status(401).json({
                mensaje: "No se proporcionó un token de autenticación"
            });
        }

        // extraemos el token, quitando la palabra Bearer.
        const token = encabezado.split(" ")[1];

        // verificamos el token utilizando la clave secreta almacenada en las variables de entorno.
        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // guardamos los datos del usuario en la solicitud para que puedan utilizarse en los siguientes pasos.
        req.usuario = datosUsuario;

        // permitimos que la solicitud continúe.
        next();

    } catch (error) {
        // si el token no es válido o está vencido, rechazamos la solicitud.
        return res.status(401).json({
            mensaje: "El token es inválido o ha expirado"
        });
    }
};



