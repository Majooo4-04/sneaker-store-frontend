# 👟 Sneaker Store

Sneaker Store es una aplicación web desarrollada como proyecto académico, enfocada en la venta y administración de tenis deportivos. El sistema cuenta con un frontend desarrollado en React, un backend construido con Node.js y Express, una base de datos MySQL y una aplicación Flutter para Wear OS que permite visualizar estadísticas de la tienda desde un reloj inteligente.

---

# Características principales

## Cliente

- Registro e inicio de sesión.
- Catálogo de productos.
- Búsqueda inteligente mediante Fuse.js.
- Visualización del detalle de cada producto.
- Agregar productos al carrito.
- Agregar productos a favoritos.
- Notificaciones al iniciar sesión.
- Diseño responsivo.

## Administrador

- Inicio de sesión.
- Dashboard administrativo.
- Administración de productos.
- Administración de marcas.
- Administración de pedidos.
- Administración de usuarios.
- Notificaciones de acciones exitosas y errores.
- Integración con Flutter Wear.

## Wearable (Flutter Wear OS)

- Inicio de sesión.
- Visualización de estadísticas de la tienda.
- Comunicación con el backend mediante API REST.
- Consumo de datos protegidos mediante JWT.

---

# Tecnologías utilizadas

## Frontend

- React
- React Router DOM
- Axios
- Fuse.js
- React Toastify
- Lucide React
- CSS

## Backend

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcrypt
- CORS

## Wearable

- Flutter
- Dart
- HTTP
- Shared Preferences
- Wear OS

---

# Arquitectura del proyecto

```
                 React
             (Frontend Web)
                    │
              Axios (HTTP)
                    │
                    ▼
         Node.js + Express API
                    │
             JWT + Sequelize
                    │
                    ▼
                 MySQL
                    ▲
                    │
              Flutter Wear OS
```

---

# Funcionalidades implementadas

- Inicio de sesión con autenticación JWT.
- Gestión completa de productos.
- Gestión de marcas.
- Catálogo dinámico.
- Carrito de compras.
- Favoritos.
- Dashboard administrativo.
- Dashboard para Wear OS.
- Estadísticas en tiempo real.
- Buscador mediante Fuse.js.
- Integración React + Flutter.
- Consumo de API REST.
- Diseño adaptable.

---

# Librerías utilizadas

## Frontend

- react
- react-router-dom
- axios
- fuse.js
- react-toastify
- lucide-react

## Backend

- express
- sequelize
- mysql2
- bcrypt
- jsonwebtoken
- dotenv
- cors

## Flutter

- http
- shared_preferences
- wear_plus

---

# Requisitos

Antes de ejecutar el proyecto es necesario instalar:

- Node.js
- npm
- MySQL
- Flutter SDK
- Android Studio
- Visual Studio Code

---

# Instalación del Frontend

Clonar el repositorio

```
git clone https://github.com/Majooo4-04/sneaker-store-frontend.git
```

Entrar al proyecto

```
cd sneaker-store-frontend
```

Instalar dependencias

```
npm install
```

Ejecutar

```
npm run dev
```

---

# Variables necesarias

Crear un archivo `.env` con la URL del backend.

Ejemplo:

```
VITE_API_URL=http://localhost:3001/api
```

---

# Usuarios de prueba

## Administrador

Correo

```
admin@gmail.com
```

Contraseña

```
Admin123+
```

---

## Usuario

Correo

```
gomez@gmail.com
```

Contraseña

```
Canelo2004+
```

---

# Navegadores compatibles

El proyecto fue probado en:

- Google Chrome
- Microsoft Edge

La aplicación Wear OS fue desarrollada para dispositivos Android Wear.

---

# Buscador

Se implementó un buscador inteligente utilizando Fuse.js.

Permite localizar productos por:

- Nombre
- Marca

sin necesidad de recargar la página.

---

# Notificaciones

Se implementaron notificaciones utilizando React Toastify para informar al usuario sobre:

- Inicio de sesión exitoso.
- Errores de autenticación.
- Producto agregado.
- Producto actualizado.
- Producto eliminado.

---

# Integración con Flutter

La aplicación Flutter consume la API REST para mostrar estadísticas de la tienda.

Datos visualizados:

- Ventas totales.
- Pedidos realizados.
- Pedidos pendientes.

---

# Base de datos

Motor utilizado:

MySQL

La comunicación se realiza mediante Sequelize ORM.

---

# Autor

**María José Flores Uribe**

Universidad Tecnológica de Querétaro

Ingeniería en Desarrollo y Gestión de Software

Proyecto académico 2026.