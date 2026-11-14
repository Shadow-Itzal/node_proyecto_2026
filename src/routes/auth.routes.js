
/*
====================================================
¿PARA QUÉ SIRVE?
Este archivo define las rutas relacionadas con
el registro y el inicio de sesión de los usuarios.

Cada ruta recibe una solicitud HTTP y la deriva
a la función correspondiente del controlador.

Las operaciones serán:
- POST /register: registrar un usuario.
- POST /login: iniciar sesión.
====================================================
*/

// importamos Router desde Express para crear las rutas de autenticación.
import { Router } from "express";

// importamos las funciones del controlador que se encargarán de procesar las solicitudes.
import {
    registrarUsuario,
    iniciarSesion
} from "../controllers/auth.controller.js";

// creamos el enrutador.
const router = Router();


// ==================================================
// RUTAS DE AUTENTICACIÓN
// ==================================================

// ruta para registrar un usuario nuevo.
router.post("/register", registrarUsuario);

// ruta para iniciar sesión.
router.post("/login", iniciarSesion);


// exportamos el enrutador para poder utilizarlo desde el archivo principal index.js.
export default router;

