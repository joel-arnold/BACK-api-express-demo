# API Express Demo - UTN

Este proyecto es una demostración de cómo crear una API REST con Node.js y Express sin usar TypeScript ni ORM.

## 🚀 Características

- **Arquitectura por capas**: Separación clara de responsabilidades
- **CRUD completo**: Crear, leer, actualizar y eliminar usuarios
- **Validación manual**: Validaciones básicas sin librerías externas
- **Middleware personalizado**: Logger para tracking de requests
- **Manejo de errores**: Respuestas consistentes y manejo de errores
- **Sin base de datos**: Usa arrays en memoria para simplicidad

## 📁 Estructura del Proyecto

```
src/
├── controllers/        # Manejo de req/res HTTP
│   └── user.controller.js
├── services/          # Lógica de negocio
│   └── user.service.js
├── routes/            # Definición de endpoints
│   └── user.routes.js
├── app.js            # Configuración de Express
└── server.js         # Entry point de la aplicación
```

## 🛠️ Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Ejecutar en modo producción:**
   ```bash
   npm start
   ```

El servidor estará disponible en: `http://localhost:3000`

## 📋 Endpoints Disponibles

### Información de la API
- `GET /` - Información general y endpoints disponibles

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario por ID
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario existente
- `DELETE /users/:id` - Eliminar un usuario

## 🧪 Ejemplos de Uso

### Obtener todos los usuarios
```bash
curl http://localhost:3000/users
```

### Obtener un usuario específico
```bash
curl http://localhost:3000/users/1
```

### Crear un nuevo usuario
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@example.com"}'
```

### Actualizar un usuario
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Carlos Pérez"}'
```

### Eliminar un usuario
```bash
curl -X DELETE http://localhost:3000/users/1
```

## 🎯 Conceptos Didácticos

### Flujo de la Aplicación
```
Cliente → Ruta → Controller → Service → Datos (Array) → Respuesta JSON
```

### Separación de Responsabilidades
- **Routes**: Definición de endpoints y métodos HTTP
- **Controllers**: Manejo de request/response, validaciones básicas
- **Services**: Lógica de negocio y manipulación de datos

### Middlewares Implementados
- `express.json()`: Para parsear JSON en el body
- `logger`: Middleware personalizado para logging de requests

## 📚 Para Estudiantes

Este proyecto demuestra:
1. ✅ Estructura básica de una API REST
2. ✅ Separación de responsabilidades por capas
3. ✅ Manejo de errores y validaciones
4. ✅ Operaciones CRUD completas
5. ✅ Middleware personalizado
6. ✅ Buenas prácticas de organización de código

## 🔧 Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web minimalista
- **Nodemon**: Auto-reload durante desarrollo