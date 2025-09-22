# API Express Demo - UTN (TypeScript)

Este proyecto es una demostración de cómo crear una API REST con Node.js, Express, TypeScript y MikroORM con persistencia en MySQL.

## 🚀 Características

- **TypeScript**: Tipado estático para mayor seguridad y productividad
- **Arquitectura por capas**: Separación clara de responsabilidades
- **CRUD completo**: Crear, leer, actualizar y eliminar usuarios
- **Persistencia en base de datos**: Uso de MySQL con MikroORM y decoradores
- **Validación tipada**: Validaciones tanto en controladores como en servicios
- **Validación con Joi**: Esquemas centralizados y middleware reusable
- **Middleware personalizado**: Logger para tracking de requests
- **Manejo de errores**: Respuestas consistentes y manejo de errores tipado
- **ORM moderno**: MikroORM con decoradores TypeScript para mapeo de entidades

## 🗄️ Configuración de Base de Datos

### Prerrequisitos
1. MySQL Server instalado y ejecutándose
2. MySQL Workbench (recomendado para administración)
3. Node.js 16+ con soporte para TypeScript

### Configuración
1. Crear una base de datos llamada `api-express-demo` en MySQL
2. Configurar las credenciales en `src/config/mikro-orm.config.ts`:
   - Host: localhost
   - Puerto: 3306
   - Usuario: root
   - Contraseña: root

### Verificar Conexión
```bash
npx ts-node test-db.ts
```

## 📁 Estructura del Proyecto

```
src/
├── config/            # Configuraciones TypeScript
│   └── mikro-orm.config.ts
├── controllers/       # Manejo de req/res HTTP tipado
│   └── user.controller.ts
├── entities/          # Entidades con decoradores TypeScript
│   └── User.ts
├── helpers/           # Utilidades tipadas
│   └── response.helper.ts
├── routes/            # Definición de rutas tipadas
│   └── user.routes.ts
├── services/          # Lógica de negocio tipada
│   └── user.service.ts
├── types/             # Tipos globales
│   └── global.d.ts
└── app.ts             # Punto de entrada TypeScript
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

## ✅ Validación con Joi

Este proyecto utiliza Joi para validar entradas (body, params, query) antes de llegar a los controladores.

### Middleware `validate`

- Archivo: `src/middlewares/validate.ts`
- Uso: `validate({ location: 'body' | 'params' | 'query', schema, abortEarly?: false, stripUnknown?: true })`
- Comportamiento:
   - Valida `req[location]` con el esquema provisto.
   - Sanitiza removiendo campos no definidos en el esquema (`stripUnknown: true`).
   - En caso de error, responde 400 con `error` y `errors` (detalle de Joi).

### Esquemas disponibles

- Archivo: `src/schemas/user.schema.ts`
   - `createUserSchema`: requiere `name` (string 2-100) y `email` (formato válido).
   - `updateUserSchema`: permite `name`/`email` opcionales, exige al menos un campo.
   - `idParamSchema`: valida `id` como entero positivo.

### Aplicación en rutas

Archivo: `src/routes/user.routes.ts`

```ts
router.get('/:id', validate({ location: 'params', schema: idParamSchema }), userController.getUser);
router.post('/', validate({ location: 'body', schema: createUserSchema }), userController.createUser);
router.put('/:id',
   validate({ location: 'params', schema: idParamSchema }),
   validate({ location: 'body', schema: updateUserSchema }),
   userController.updateUser
);
router.delete('/:id', validate({ location: 'params', schema: idParamSchema }), userController.deleteUser);
```

### Extender validaciones

Para agregar nuevas reglas (por ejemplo, longitud de `name` o dominios de email), edita `src/schemas/user.schema.ts`:

```ts
const name = Joi.string().trim().min(2).max(100).required();
const email = Joi.string().trim().email({ tlds: { allow: false } }).required();
```

Si necesitas validar `query` en una ruta, crea un esquema y úsalo así:

```ts
router.get('/', validate({ location: 'query', schema: listQuerySchema }), controller.list);
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

### Entidad User (TypeScript)
```typescript
@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
```

### Scripts Disponibles
```bash
npm run build       # Compilar TypeScript a JavaScript
npm run dev         # Ejecutar en modo desarrollo con ts-node
npm run dev:watch   # Ejecutar con nodemon y recarga automática
npm start           # Ejecutar versión compilada en producción
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
- **TypeScript**: Superset tipado de JavaScript
- **Express**: Framework web minimalista con tipos
- **MikroORM**: ORM moderno para TypeScript/Node.js
- **MySQL**: Sistema de gestión de bases de datos relacionales
- **Reflect Metadata**: Para soporte de decoradores
- **ts-node**: Ejecución directa de TypeScript en desarrollo
- **Nodemon**: Auto-recarga durante el desarrollo

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**
2. **Instalar dependencias**: `npm install`
3. **Configurar MySQL**: Crear base de datos "api-express-demo"
4. **Verificar conexión**: `npx ts-node test-db.ts`
5. **Ejecutar en desarrollo**: `npm run dev`
6. **Compilar para producción**: `npm run build`
7. **Ejecutar producción**: `npm start`

## 💡 Ventajas de TypeScript

- ✅ **Tipado estático**: Prevención de errores en tiempo de compilación
- ✅ **IntelliSense mejorado**: Mejor autocompletado en IDEs
- ✅ **Refactoring seguro**: Cambios con confianza
- ✅ **Decoradores nativos**: Uso pleno de MikroORM
- ✅ **Interfaces**: Contratos claros entre capas
- ✅ **Mejor documentación**: Código autodocumentado