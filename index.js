/*
====================================
PARA QUE SIRVE?
Es el archivo principal de nuestra aplicación.
Se encarga de iniciar el servidor Express,
configurar los middlewares y establecer el puerto
en el que nuestra API recibirá las solicitudes.

También contiene la ruta principal y
el manejo de rutas que no existen.
====================================
*/

// importamos Express para crear nuestro servidor
import express from "express";

// importamos body-parser para interpretar los datos enviados en el cuerpo (body) de las peticiones
import bodyParser from "body-parser";

// importamos dotenv para leer las variables de entorno almacenadas en el archivo .env
import dotenv from "dotenv";

// importamos CORS para permitir solicitudes desde otros orígenes
import cors from "cors";

// cargamos las variables del archivo .env
dotenv.config();

// creamos nuestra aplicación Express
const app = express();

// habilitamos CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// definimos el puerto del servidor. Si no encuentra PORT en .env, usaremos el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;


// ====================================
// MIDDLEWARES
// ====================================

// permitimos que Express interprete los datos enviados en formato JSON en las peticiones
app.use(bodyParser.json());


// ====================================
// RUTA PRINCIPAL
// ====================================

// esta ruta permite comprobar que nuestra API está funcionando correctamente. 
app.get(`/`, (req, res) => {
    res.send("API del proyecto Node.js funcionando correctamente");
});


// ====================================
// MANEJO DE RUTAS NO ENCONTRADAS
// ====================================

// si el usuario intenta acceder a una ruta que no existe, le devolvemos un mensaje de error con el código 404 (Not Found).
// este middleware debe ir al final de todas las rutas definidas, para que solo se ejecute si ninguna ruta anterior coincide con la solicitud.
app.use((req, res) => {
    res.status(404).json({mensaje: "La ruta solicitada no existe. Por favor, verifica la URL y el método HTTP."});
});


// ====================================
// INICIO DEL SERVIDOR
// ====================================

// iniciamos el servidor en el puerto definido y mostramos un mensaje en la consola indicando que está funcionando correctamente.
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});





