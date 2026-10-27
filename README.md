# Talleres de Ingeniería Web y Móvil

Este repositorio contiene las soluciones e implementaciones desarrolladas para la asignatura de **Ingeniería Web y Móvil** de la Pontificia Universidad Católica de Valparaíso (PUCV).

**Autor:** Iván Ferreira León  
**Carrera:** Ingeniería Civil Informática / Ingeniería Informática — PUCV  

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, Ionic Framework, TypeScript, React Router.
- **Backend:** Node.js, Express.
- **Autenticación & Seguridad:** JSON Web Tokens (JWT), bcrypt.js, variables de entorno (`.env`).
- **Herramientas & Entorno:** VS Code, Git / GitHub, Postman.

---

## 📁 Contenido del Repositorio

El repositorio está organizado por talleres de aprendizaje progresivo:

- **Talleres de Fundamentos y Frontend:** Desarrollo de interfaces móviles y web híbridas utilizando Ionic + React, gestión de estado y navegación con React Router.
- **Talleres de API & Backend:** Creación de servidores RESTful con Express, manejo de datos y peticiones HTTP (GET, POST, PUT, DELETE).
- **Taller 9 (Autenticación y Autorización):**
  - Implementación de autenticación basada en **JWT** y almacenamiento seguro de contraseñas con **hash** (`bcryptjs`).
  - Protección de endpoints con middleware de verificación de token y control de permisos (autorización).
  - Integración frontend/backend con rutas protegidas (`<RutaProtegida>`), sesiones con `localStorage` y flujos completos de inicio de sesión, registro y actualización de credenciales.

---

## 🚀 Cómo ejecutar los proyectos

Cada carpeta de taller que contenga frontend y backend requiere levantar ambos entornos de manera independiente:

1. **Backend:**
   ```bash
   cd "Taller 9/taller9-backend"
   npm install
   npm run dev```
   
2. **Frontend:**
   ```bash
   cd "Taller 9/taller9-frontend"
   npm install
   ionic serve
   ```
