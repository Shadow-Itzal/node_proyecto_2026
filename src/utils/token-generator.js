
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo contiene la función encargada de
generar los tokens JWT de nuestra aplicación.

El token permitirá identificar al usuario cuando
realice solicitudes a las rutas protegidas.

Su validez será de una hora.
====================================================
*/

// importamos jsonwebtoken para generar los tokens.
import jwt from "jsonwebtoken";


// ==================================================
// GENERAR TOKEN JWT
// ==================================================

// recibimos los datos del usuario que incluiremos dentro del token.
export const generarToken = (datosUsuario) => {

    // obtenemos la clave secreta desde el archivo .env.
    const claveSecreta = process.env.JWT_SECRET;

    // comprobamos que exista una clave secreta.
    if (!claveSecreta) {
        throw new Error("No se encontró JWT_SECRET en el archivo .env");
    }

    // generamos el token con los datos del usuario.
    const token = jwt.sign(
        datosUsuario,
        claveSecreta,
        {
            expiresIn: "1h"
        }
    );

    // devolvemos el token generado.
    return token;
};


