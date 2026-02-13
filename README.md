# 🚀 TaskFlow - Frontend

Aplicación web para la gestión de proyectos y tareas con autenticación JWT.  
Permite crear proyectos, agregar tareas y gestionar su estado (ToDo, Doing, Done).

## 🔗 Demo en producción:  

Este frontend consume una API REST desarrollada en Node.js y Express.

Frontend:
- 👉 https://taskflow-frontend-liart.vercel.app/

Repositorio del backend:
- 👉 https://github.com/cristiangc92/taskflow-api

El backend está desplegado en Render.

---

## 🛠️ Tecnologías utilizadas

- React (Vite)
- React Router DOM
- Axios
- Bootstrap 5
- JWT (JSON Web Tokens)
- Context API
- Vercel (deploy frontend)
- Render (deploy backend)

---

## 📌 Funcionalidades

- Registro de usuario
- Login con autenticación JWT
- Protección de rutas privadas
- Logout automático ante token expirado (Interceptor Axios)
- Crear proyectos
- Crear tareas dentro de cada proyecto
- Cambiar estado de tareas (ToDo / Doing / Done)
- UI reactiva según estado de autenticación
- Manejo global de autenticación con Context API

---

## 🔐 Autenticación

La aplicación utiliza:

- JWT almacenado en localStorage
- Interceptor de Axios para adjuntar token automáticamente
- Logout automático cuando el backend responde 401
- Protección de rutas mediante componente ProtectedRoute

---

## 📂 Estructura del proyecto

```bash
src/
│
├── api/ # Configuración de Axios
├── components/ # Componentes reutilizables (Layout, etc.)
├── context/ # Manejo global de autenticación
├── pages/ # Login, Register, Dashboard
├── routes/ # Definición de rutas (AppRouter)
├── services/ # Servicios HTTP
├── styles/ # Estilos personalizados
├── App.jsx
└── main.jsx
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```bash
VITE_API_URL=https://TU_BACKEND_URL/api
```

En producción (Vercel) configurar la variable:

VITE_API_URL

---

## ▶️ Instalación y ejecución local

1. Clonar el repositorio

```bash
git clone https://github.com/cristiangc92/taskflow-frontend.git
```

2. Instalar dependencias

```bash
npm install
```

3. Crear archivo `.env`

```bash
VITE_API_URL=http://localhost:3000/api
```

4. Ejecutar proyecto

```bash
npm run dev
```

---

## 🌍 Deploy

El frontend está desplegado en **Vercel**.  
El backend está desplegado en **Render**.

Configuración adicional necesaria en Vercel:

Archivo `vercel.json` para soporte SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 🧠 Decisiones técnicas

- Uso de Context API para manejo global de autenticación.
- Interceptor Axios para centralizar el manejo de token.
- Separación de responsabilidades (services / context / components).
- Manejo explícito de errores del backend.
- Arquitectura preparada para escalar.

## 📬 Contacto

Desarrollado por Cristian Gabriel Cacciolatti
GitHub: https://github.com/cristiangc92