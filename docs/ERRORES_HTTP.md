
# 🧪 Documentación de pruebas y respuestas HTTP

Este documento reúne los códigos de estado HTTP utilizados por la API REST de Productos y las pruebas realizadas mediante Postman.

Su objetivo es documentar las respuestas del servidor ante solicitudes correctas, datos inválidos, errores de autenticación y operaciones no permitidas.

---

## 1. Respuestas exitosas

| Código | Nombre | Situación |
|---|---|---|
| 200 | OK | Solicitud procesada correctamente. |
| 201 | Created | Usuario o producto creado correctamente. |

### Pruebas realizadas

- Consulta de todos los productos.
- Consulta de un producto por su ID.
- Inicio de sesión con credenciales correctas.
- Actualización de un producto.
- Eliminación de un producto existente con permisos de administrador.

---

## 2. Errores del cliente

### 400 - Bad Request

Se produce cuando faltan datos obligatorios o la solicitud no contiene la información requerida.

**Pruebas realizadas:**

- Registro de usuario sin correo electrónico o contraseña.
- Inicio de sesión sin todos los datos requeridos.
- Creación de un producto enviando un objeto vacío.
- Actualización de un producto enviando un objeto vacío.

### 401 - Unauthorized

Se produce cuando la solicitud no está autenticada correctamente.

**Pruebas realizadas:**

- Acceder a una ruta protegida sin enviar un token JWT.
- Enviar un token inválido o vencido.
- Iniciar sesión con una contraseña incorrecta.
- Iniciar sesión con un correo electrónico inexistente.

### 403 - Forbidden

Se produce cuando el usuario está autenticado, pero no tiene permisos suficientes para realizar una operación.

**Pruebas realizadas:**

Se utilizó una cuenta con rol `usuario` para intentar:

- Crear un producto.
- Modificar un producto.
- Eliminar un producto.

En los tres casos, el servidor rechazó la operación porque requiere permisos de administrador.

### 404 - Not Found

Se produce cuando el recurso solicitado no existe.

**Pruebas realizadas:**

- Consultar un producto con un ID inexistente.
- Modificar un producto inexistente.
- Eliminar un producto inexistente.
- Consultar una ruta que no está definida en la API.

### 409 - Conflict

Se produce cuando existe un conflicto con el estado actual de los datos.

**Prueba realizada:**

- Intentar registrar nuevamente un usuario utilizando un correo electrónico que ya está registrado.

El servidor rechaza el registro para evitar usuarios duplicados.

### 422 - Unprocessable Entity

Se produce cuando los datos enviados tienen un formato incorrecto o no cumplen las validaciones establecidas.

**Pruebas realizadas durante la creación y actualización de productos:**

- Enviar un precio como texto en lugar de un número.
- Enviar un stock negativo.
- Enviar una categoría vacía.
- Enviar una categoría con un valor numérico.
- Enviar un campo no permitido, por ejemplo `rol` o `stocko`.

El servidor rechaza los datos y devuelve un mensaje que identifica el problema.

---

## 3. Errores del servidor

### 500 - Internal Server Error

Se utiliza cuando ocurre un problema inesperado durante el procesamiento de una solicitud.

Los errores internos son capturados mediante bloques `try/catch` en los controladores.

No se documenta una prueba exitosa de error 500 en esta etapa.

---

## 4. Resumen de códigos HTTP

| Código | Significado | Resultado |
|---|---|---|
| 200 | OK | Operación exitosa. |
| 201 | Created | Recurso creado. |
| 400 | Bad Request | Solicitud incompleta o incorrecta. |
| 401 | Unauthorized | Falta autenticación válida. |
| 403 | Forbidden | Permisos insuficientes. |
| 404 | Not Found | Recurso o ruta inexistente. |
| 409 | Conflict | Conflicto con datos existentes. |
| 422 | Unprocessable Entity | Datos que no superan las validaciones. |
| 500 | Internal Server Error | Error interno del servidor. |

---

## 5. Herramienta utilizada

Las pruebas se realizaron mediante **Postman**, enviando solicitudes HTTP a los distintos endpoints de la API.

Se verificaron:

- Los códigos de estado HTTP.
- Los mensajes de respuesta.
- La validación de los datos recibidos.
- La autenticación mediante JWT.
- La autorización según el rol del usuario.
- Las operaciones CRUD sobre productos.

---

**Proyecto Final - Node.js 2026**
