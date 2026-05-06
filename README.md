# ☕ Café de Barrio — Mini E-commerce

Aplicación web fullstack para la gestión de pedidos de una cafetería local.

## 🛠️ Tecnologías

- **Backend:** Java 22, Spring Boot 3.5, Spring Data JPA, Hibernate
- **Frontend:** Angular 21, TypeScript, SCSS
- **Base de datos:** SQL Server 2022

## 📋 Requisitos previos

- Java 22
- Maven 3.9+
- Node.js 24 + Angular CLI 21
- SQL Server con base de datos `cafe_de_barrio`

## 🚀 Cómo ejecutar

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

## 🗄️ Base de datos

Crear la base de datos en SQL Server:
```sql
CREATE DATABASE cafe_de_barrio;
```
Las tablas se generan automáticamente al iniciar el backend.

## 📌 Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/productos | Listar productos |
| GET | /api/productos/{id} | Detalle de producto |
| GET | /api/productos?categoriaId={id} | Filtrar por categoría |
| POST | /api/productos | Crear producto |
| PUT | /api/productos/{id} | Editar producto |
| DELETE | /api/productos/{id} | Desactivar producto |
| GET | /api/categorias | Listar categorías |
| GET | /api/pedidos | Listar pedidos |
| POST | /api/pedidos | Crear pedido |
| PATCH | /api/pedidos/{id}/estado | Cambiar estado |

## 📱 Pantallas principales

- `/catalogo` — Catálogo con filtro por categoría
- `/producto/:id` — Detalle de producto
- `/carrito` — Carrito de compras
- `/checkout` — Formulario de pedido
- `/admin/productos` — Gestión de productos
- `/admin/pedidos` — Gestión de pedidos

## ✅ Criterios de aceptación

- El catálogo carga datos reales desde la API
- No se puede registrar un pedido sin nombre, celular y productos
- El backend rechaza pedidos con stock insuficiente
- El stock se descuenta automáticamente al confirmar un pedido
- La vista administrativa permite crear productos y verlos en el catálogo