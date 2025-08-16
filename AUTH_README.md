# Autenticación JWT - Implementación

Esta implementación añade autenticación JWT al proyecto Express demo.

## Archivos creados/modificados:

### Nuevos archivos:
- `src/services/auth.service.ts` - Servicio de autenticación con JWT
- `src/middlewares/auth.middleware.ts` - Middleware de autenticación
- `src/controllers/auth.controller.ts` - Controlador de autenticación
- `src/routes/auth.routes.ts` - Rutas de autenticación
- `src/routes/index.routes.ts` - Archivo unificador de todas las rutas

### Archivos modificados:
- `src/entities/User.ts` - Agregada propiedad password
- `src/services/user.service.ts` - Soporte para contraseñas y autenticación
- `src/routes/user.routes.ts` - Middleware de autenticación aplicado
- `src/app.ts` - Rutas unificadas bajo `/api` agregadas
- `src/helpers/response.helper.ts` - Método unauthorized agregado
- `.env` - Variables JWT agregadas

## Configuración:

### 1. Variables de entorno (.env)
```env
JWT_SECRET=tu-clave-secreta-super-segura-aqui-cambiar-en-produccion
JWT_EXPIRES_IN=24h
```

### 2. Migración de base de datos
Si aún no tienes la columna `password` en tu tabla `users`, ejecuta:
```sql
ALTER TABLE users 
ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

## Endpoints disponibles:

### Autenticación:
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere token)
- `GET /api/auth/verify` - Verificar token (requiere token)

### Usuarios:
- `GET /api/users` - Listar usuarios (sin autenticación)
- `GET /api/users/:id` - Obtener usuario (sin autenticación)
- `POST /api/users` - Crear usuario (requiere token)
- `PUT /api/users/:id` - Actualizar usuario (requiere token)
- `DELETE /api/users/:id` - Eliminar usuario (requiere token)

## Uso:

### 1. Registro:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

### 2. Inicio de sesión:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

### 3. Usar token en rutas protegidas:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "name": "Ana García",
    "email": "ana@ejemplo.com",
    "password": "123456"
  }'
```

## Características implementadas:

✅ **Middleware de autenticación**: Protege rutas específicas
✅ **Servicio JWT**: Generación y verificación de tokens
✅ **Encriptación de contraseñas**: Usando bcryptjs
✅ **Variables de entorno**: Configuración segura
✅ **Rutas públicas**: getUsers y getUser sin autenticación
✅ **Rutas protegidas**: CRUD operations requieren token
✅ **Validaciones**: Email único, formato, contraseñas seguras
✅ **Tipado TypeScript**: Interfaces y tipos definidos
✅ **Manejo de errores**: Respuestas consistentes
✅ **Headers Authorization**: Formato Bearer token

## Seguridad:

- Contraseñas encriptadas con bcryptjs (salt rounds: 12)
- Tokens JWT con expiración configurable
- Validación de formato de email
- Contraseña mínima de 6 caracteres
- Campo password oculto en serialización de User
- Verificación de email único en registro y actualización
