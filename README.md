# 🚀 API REST de Productos | Proyecto Final Node.js 2026

API REST desarrollada como proyecto final del curso de Node.js 2026. Permite gestionar productos almacenados en Firebase Firestore, registrar usuarios, iniciar sesión y controlar el acceso mediante autenticación JWT y roles.

## ✨ Funcionalidades principales

- Consulta de todos los productos.
- Consulta de un producto por su ID.
- Creación, modificación y eliminación de productos.
- Registro de usuarios.
- Inicio de sesión mediante credenciales.
- Autenticación mediante tokens JWT.
- Contraseñas protegidas mediante hash con bcryptjs.
- Control de permisos según el rol del usuario.
- Almacenamiento de datos en Firebase Firestore.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Creación del servidor y las rutas |
| Firebase Firestore | Base de datos |
| CORS | Gestión de solicitudes entre distintos orígenes |
| dotenv | Administración de variables de entorno |
| jsonwebtoken | Generación y verificación de tokens |
| bcryptjs | Protección de contraseñas |

## 📦 Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta del proyecto:

```bash
cd node_proyecto_2026
```

Instalar las dependencias:

```bash
npm install
```

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia el archivo `.env.example`.

Completar las siguientes variables con los datos correspondientes:

```env
PORT=3000

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=nombre_de_tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

JWT_SECRET=una_clave_secreta_larga_y_aleatoria
```

## ▶️ Ejecución

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Iniciar el servidor en modo normal:

```bash
npm start
```

Por defecto, el servidor funciona en:

`http://localhost:3000`

## 🌐 Rutas de la API

### Inicio

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Comprueba que la API está funcionando. |

Respuesta:

```json
{
  "mensaje": "API del proyecto Node.js funcionando correctamente"
}
```

### Productos

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/products` | Obtener todos los productos. | Público |
| GET | `/api/products/:id` | Obtener un producto por su ID. | Público |
| POST | `/api/products/create` | Crear un producto. | Administrador |
| PUT | `/api/products/:id` | Modificar un producto. | Administrador |
| DELETE | `/api/products/:id` | Eliminar un producto. | Administrador |

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar un usuario. |
| POST | `/auth/login` | Iniciar sesión y obtener un token JWT. |

## 🔐 Autenticación y autorización

La API utiliza JSON Web Tokens (JWT) para autenticar a los usuarios.

Al iniciar sesión correctamente, el servidor genera un token que debe enviarse en las solicitudes que requieren autenticación, mediante el encabezado:

```http
Authorization: Bearer TU_TOKEN
```

Se implementaron dos roles:

- **usuario:** puede consultar los productos.
- **admin:** puede consultar, crear, modificar y eliminar productos.

El acceso a las operaciones protegidas se controla mediante los middlewares `verificarToken` y `verificarAdmin`.

Las contraseñas se almacenan protegidas mediante bcryptjs.

## 📋 Códigos de respuesta HTTP

La API utiliza códigos de estado HTTP para indicar el resultado de cada solicitud.

### Respuestas exitosas

| Código | Significado | Cuándo se utiliza |
|---|---|---|
| `200 OK` | Solicitud exitosa. | Consulta de productos, inicio de sesión y operaciones que finalizan correctamente con respuesta 200. |
| `201 Created` | Recurso creado. | Registro de un usuario o creación de un producto. |

### Errores del cliente

| Código | Significado | Cuándo se utiliza |
|---|---|---|
| `400 Bad Request` | Solicitud incorrecta. | Cuando faltan datos, los datos enviados son inválidos o no cumplen las validaciones. |
| `401 Unauthorized` | No autorizado. | Cuando no se envía un token, el token es inválido o las credenciales de inicio de sesión son incorrectas. |
| `403 Forbidden` | Acceso prohibido. | Cuando el usuario está autenticado, pero no tiene permisos suficientes para realizar la operación. |
| `404 Not Found` | Recurso no encontrado. | Cuando el producto solicitado no existe o se consulta una ruta inexistente. |

### Errores del servidor

| Código | Significado | Cuándo se utiliza |
|---|---|---|
| `500 Internal Server Error` | Error interno del servidor. | Cuando ocurre un problema inesperado durante el procesamiento de una solicitud. |

**Nota:** El mensaje que acompaña al código HTTP permite identificar con mayor precisión qué ocurrió durante la operación.

## 🔥 Base de datos

El proyecto utiliza Firebase Firestore para almacenar la información.

Se utilizan las siguientes colecciones:

### Colección `productos`

Cada documento contiene:

| Campo | Tipo | Ejemplo |
|---|---|---|
| `nombre` | String | Remera |
| `precio` | Number | 15000 |
| `stock` | Number | 10 |
| `categoria` | String | Indumentaria |

### Colección `users`

Almacena los datos de los usuarios, incluyendo su correo electrónico, contraseña protegida y rol correspondiente.

## 📁 Estructura del proyecto

```text
node_proyecto_2026/
│
├── src/
│   ├── config/
│   │   └── firebase.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── productos.controller.js
│   │
│   ├── middlewares/
│   │   ├── authentication.js
│   │   └── authorization.js
│   │
│   ├── models/
│   │   ├── productos.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── productos.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── productos.service.js
│   │
│   └── utils/
│       └── token-generator.js
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## 🧪 Pruebas

Las solicitudes de la API se realizan mediante Postman.

Se verifican las operaciones de consulta, creación, modificación y eliminación de productos, además del inicio de sesión y el control de permisos según el rol del usuario.

## 📄 Licencia

Este proyecto se encuentra bajo la licencia MIT.

## 👩‍💻 Autora

**Marta Mariana Dominguez**

Proyecto Final - Node.js 2026