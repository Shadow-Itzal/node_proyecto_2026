
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo contiene las funciones que reciben
las solicitudes relacionadas con la autenticación
de los usuarios.

Se encarga de:
- Validar los datos recibidos.
- Solicitar al servicio que registre un usuario.
- Solicitar al servicio que verifique el inicio
  de sesión.
- Enviar las respuestas correspondientes.

El controlador recibe la petición y se comunica
con el servicio, pero no realiza directamente
las operaciones con Firebase.
====================================================
*/

// importamos el servicio que contiene la lógica para registrar usuarios e iniciar sesión.
import * as authService from "../services/auth.service.js";


// ==================================================
// REGISTRAR USUARIO
// ==================================================

// esta función recibe los datos de un nuevo usuario y solicita al servicio que lo registre.
export const registrarUsuario = async (req, res) => {
    try {
        // obtenemos el correo y la contraseña, enviados en el cuerpo de la solicitud.
        const { email, password } = req.body;

        // verificamos que se haya ingresado un correo y una contraseña.
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                mensaje: "El correo y la contraseña son obligatorios"
            });
        }

        // comprobamos que la contraseña tenga al menos 6 caracteres.
        if (password.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        // enviamos los datos al servicio para registrar al nuevo usuario.
        const nuevoUsuario = await authService.registrarUsuario(email, password);

        // si el servicio devuelve null, significa que ya existe un usuario registrado con ese correo.
        if (!nuevoUsuario) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario registrado con ese correo"
            });
        }

        // si el registro fue exitoso, respondemos con los datos del nuevo usuario.
        return res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {
        // mostramos el error en la consola para poder identificar el problema durante el desarrollo.
        console.error("Error al registrar usuario:", error);

        // enviamos una respuesta de error al cliente.
        return res.status(500).json({
            mensaje: "Error al registrar el usuario"
        });
    }
};


// ==================================================
// INICIAR SESIÓN
// ==================================================

// esta función recibe el correo y la contraseña de un usuario que desea iniciar sesión.
export const iniciarSesion = async (req, res) => {
    try {
        // obtenemos las credenciales enviadas en el cuerpo de la solicitud.
        const { email, password } = req.body;

        // verificamos que ambos datos estén presentes y tengan el formato esperado
        if (
            typeof email !== "string" || 
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({ 
                mensaje: "El correo y la contraseña son obligatorios"
            });
        }

        // enviamos las credenciales al servicio para verificar si el usuario puede ingresar.
        const resultado = await authService.iniciarSesion(email, password);

        // si el servicio devuelve null, significa que el correo o la contraseña son incorrectos.
        if (!resultado) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        // si los datos son correctos, devolvemos el token JWT y los datos del usuario.
        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token: resultado.token,
            usuario: resultado.usuario
        });

    } catch (error) {
        // mostramos el error en la consola.
        console.error("Error al iniciar sesión:", error);

        // enviamos una respuesta de error al cliente.
        return res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
};


