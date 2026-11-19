
/*
====================================================
¿PARA QUÉ SIRVE?
Es el archivo principal de nuestra aplicación.

Se encarga de:
- Configurar e iniciar el servidor Express.
- Cargar las variables de entorno.
- Habilitar los middlewares globales.
- Registrar las rutas de productos y autenticación.
- Mostrar un mensaje en la ruta principal.
- Gestionar las rutas que no existen.

====================================================
*/

// cargamos las variables de entorno del archivo .env.
import "dotenv/config";

// importamos Express para crear nuestro servidor.
import express from "express";

// importamos CORS para permitir solicitudes desde otros orígenes.
import cors from "cors";

// importamos body-parser para interpretar los datos enviados en formato json
// import bodyParser from "body-parser";

// importamos las rutas de productos.
import productosRouter from "./src/routes/productos.routes.js";

// importamos las rutas de autenticación.
import authRouter from "./src/routes/auth.routes.js";


// ==================================================
// CONFIGURACIÓN DEL SERVIDOR
// ==================================================

// creamos nuestra aplicación Express.
const app = express();

// definimos el puerto del servidor.
// Si no encuentra PORT en .env, utilizará el 3000.
const PORT = process.env.PORT || 3000;


// ==================================================
// MIDDLEWARES GLOBALES
// ==================================================

// habilitamos CORS para permitir solicitudes desde otros orígenes.
app.use(cors());

// permitimos que nuestra aplicación interprete los datos enviados en formato json.
// app.use(bodyParser.json());

// No necesitamos usar body parser, podemos usar express
app.use(express.json());

// mostramos en la consola el método y la dirección de cada solicitud que recibe nuestro servidor.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    // permitimos que la solicitud continúe.
    next();
});


// ==================================================
// RUTA PRINCIPAL
// ==================================================

// esta ruta permite comprobar que nuestra API está funcionando correctamente.
app.get("/", (req, res) => {
    res.send("API del proyecto Node.js funcionando correctamente");
});


// ==================================================
// REGISTRO DE RUTAS
// ==================================================

// conectamos las rutas de productos.
// todas comenzarán con /api/productos.
app.use("/api/products", productosRouter);

// conectamos las rutas de autenticación.
// todas comenzarán con /api/auth.
app.use("/auth", authRouter);


// ==================================================
// MANEJO DE RUTAS NO ENCONTRADAS
// ==================================================

// si alguien solicita una dirección que no existe, devolvemos el estado HTTP 404 (No encontrado).

// este middleware debe colocarse después de todas las rutas de nuestra aplicación.
app.use((req, res) => {
    res.status(404).json({
        mensaje: "La ruta solicitada no existe"
    });
});


// ==================================================
// INICIO DEL SERVIDOR
// ==================================================

// ponemos el servidor a escuchar solicitudes en el puerto definido anteriormente.
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});




