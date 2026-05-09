# ☕ Café de Barrio — Mini E-commerce

Aplicación web fullstack para la gestión de pedidos de una cafetería local.

## 🌐 URLs de producción

- **Frontend:** https://cafedebarrio.vercel.app
- **Backend:** https://cafe-de-barrio-backend.onrender.com

## 🛠️ Tecnologías

- **Backend:** Java 22, Spring Boot 3.5, Spring Security, JWT, Spring Data JPA
- **Frontend:** Angular 21, TypeScript, SCSS
- **Base de datos local:** SQL Server 2022
- **Base de datos producción:** PostgreSQL 18 (Render)

## 📋 Requisitos previos

- Java 22
- Maven 3.9+
- Node.js 24 + Angular CLI 21
- SQL Server con base de datos `cafe_de_barrio`

## 🚀 Cómo ejecutar localmente

### Backend
```bash
cd backend
mvn spring-boot:run
```
Corre en `http://localhost:8080`

### Frontend
```bash
cd frontend
ng serve
```
Corre en `http://localhost:4200`

## 🗄️ Base de datos local

Crear la base de datos en SQL Server:
```sql
CREATE DATABASE cafe_de_barrio;
```
Las tablas se generan automáticamente al iniciar el backend.

Insertar datos iniciales:
```sql
INSERT INTO roles (nombre) VALUES ('ADMIN');
INSERT INTO roles (nombre) VALUES ('CLIENTE');
```

## 🔐 Credenciales de prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | Administrador |

## 📌 Endpoints principales

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/login | Iniciar sesión | Público |
| POST | /api/auth/register | Registrarse | Público |
| GET | /api/productos | Listar productos | Público |
| GET | /api/productos/{id} | Detalle de producto | Público |
| POST | /api/productos | Crear producto | ADMIN |
| PUT | /api/productos/{id} | Editar producto | ADMIN |
| DELETE | /api/productos/{id} | Desactivar producto | ADMIN |
| GET | /api/categorias | Listar categorías | Público |
| GET | /api/pedidos | Listar pedidos | ADMIN |
| POST | /api/pedidos | Crear pedido | CLIENTE/ADMIN |
| PATCH | /api/pedidos/{id}/estado | Cambiar estado | ADMIN |

## 📱 Pantallas principales

- `/login` — Inicio de sesión
- `/registro` — Registro de usuario
- `/catalogo` — Catálogo con filtro por categoría
- `/producto/:id` — Detalle de producto
- `/carrito` — Carrito de compras
- `/checkout` — Formulario de pedido
- `/admin/productos` — Gestión de productos
- `/admin/pedidos` — Gestión de pedidos