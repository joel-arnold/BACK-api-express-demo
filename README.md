# API Express Demo - UTN

Este proyecto es una demostración de cómo crear una API REST con Node.js, Express y MikroORM con persistencia en MySQL.

## 🚀 Características

- **Arquitectura por capas**: Separación clara de responsabilidades
- **CRUD completo**: Crear, leer, actualizar y eliminar usuarios
- **Persistencia en base de datos**: Uso de MySQL con MikroORM
- **Validación**: Validaciones tanto en controladores como en servicios
- **Middleware personalizado**: Logger para tracking de requests
- **Manejo de errores**: Respuestas consistentes y manejo de errores
- **ORM moderno**: MikroORM con decoradores para mapeo de entidades

## 🗄️ Configuración de Base de Datos

### Prerrequisitos
1. MySQL Server instalado y ejecutándose
2. MySQL Workbench (recomendado para administración)

### Configuración
1. Crear una base de datos llamada `api-express-demo` en MySQL
2. Configurar las credenciales en `src/config/mikro-orm.config.js`:
   - Host: localhost
   - Puerto: 3306
   - Usuario: root
   - Contraseña: root

### Verificar Conexión
```bash
node test-db.js
```

## 📁 Estructura del Proyecto

```
src/
├── config/            # Configuraciones
│   └── mikro-orm.config.js
├── controllers/       # Manejo de req/res HTTP
│   └── user.controller.js
├── entities/          # Entidades de la base de datos
│   └── User.js
├── services/          # Lógica de negocio
│   └── user.service.js
├── routes/            # Definición de rutas
│   └── user.routes.js
├── utils/             # Utilidades
│   └── seed.js
└── app.js             # Punto de entrada
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
Cliente → Ruta → Controller → Service → Base de Datos (MySQL) → Respuesta JSON
```

### Separación de Responsabilidades
- **Routes**: Definición de endpoints y métodos HTTP
- **Controllers**: Manejo de request/response, validaciones básicas
- **Services**: Lógica de negocio y operaciones con la base de datos
- **Entities**: Definición de modelos de datos para la base de datos
- **Config**: Configuraciones de la aplicación y base de datos

### Middlewares Implementados
- `express.json()`: Para parsear JSON en el body
- `logger`: Middleware personalizado para logging de requests
- `RequestContext`: Middleware de MikroORM para manejo de contexto de entidad

## 🗃️ Base de Datos

### Entidad User
```javascript
{
  id: number (auto-increment, primary key),
  name: string,
  email: string (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Scripts Disponibles
```bash
npm run dev     # Ejecutar en modo desarrollo con nodemon
npm start       # Ejecutar en modo producción
npm run seed    # Poblar la base de datos con datos de ejemplo
```

## 📚 Para Estudiantes

Este proyecto demuestra:
1. ✅ Estructura básica de una API REST
2. ✅ Separación de responsabilidades por capas
3. ✅ Persistencia en base de datos con ORM
4. ✅ Manejo de errores y validaciones
5. ✅ Operaciones CRUD completas
6. ✅ Middleware personalizado
7. ✅ Configuración de base de datos
8. ✅ Buenas prácticas de organización de código

## 🔧 Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web minimalista
- **MikroORM**: ORM moderno para Node.js
- **MySQL**: Sistema de gestión de bases de datos relacionales
- **Reflect Metadata**: Para soporte de decoradores
- **Nodemon**: Auto-reload durante desarrollo

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**
2. **Instalar dependencias**: `npm install`
3. **Configurar MySQL**: Crear base de datos "api-express-demo"
4. **Verificar conexión**: `node test-db.js`
5. **Poblar datos iniciales**: `npm run seed` (opcional)
6. **Ejecutar**: `npm run dev`