# API Express Demo - UTN (TypeScript)

Este proyecto es una demostración de cómo crear una API REST con Node.js, Express, TypeScript y MikroORM con persistencia en MySQL, incluyendo **testing unitario completo**.

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
- **🧪 Testing unitario**: Suite completa de tests con Jest, mocks y cobertura
- **🔐 Autenticación JWT**: Sistema completo de registro, login y autenticación
- **🛡️ Borrado lógico**: Soft delete para preservar datos históricos

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
│   ├── auth.controller.ts
│   ├── auth.controller.test.ts      # 🧪 Tests del auth controller
│   ├── user.controller.ts
│   └── user.controller.test.ts      # 🧪 Tests del user controller
├── entities/          # Entidades con decoradores TypeScript
│   └── User.ts
├── helpers/           # Utilidades tipadas
│   ├── response.helper.ts
│   ├── response.helper.test.ts      # 🧪 Tests del response helper
│   ├── regex.helper.ts
│   └── regex.helper.test.ts         # 🧪 Tests del regex helper
├── middlewares/       # Middlewares personalizados
│   ├── auth.middleware.ts
│   └── validate.ts
├── routes/            # Definición de rutas tipadas
│   ├── auth.routes.ts
│   ├── index.ts
│   └── user.routes.ts
├── schemas/           # Esquemas de validación Joi
│   └── user.schema.ts
├── services/          # Lógica de negocio tipada
│   ├── auth.service.ts
│   ├── auth.service.test.ts         # 🧪 Tests del auth service
│   ├── user.service.ts
│   └── user.service.test.ts         # 🧪 Tests del user service
├── database/          # Gestión de base de datos
│   └── DatabaseManager.ts
├── catalogs/          # Mensajes y constantes
│   └── messages.json
└── app.ts             # Punto de entrada TypeScript
__tests__/             # Tests de integración
├── app.test.ts
jest.config.js         # Configuración de Jest
coverage/              # Reportes de cobertura de tests
```

## 🛠️ Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar tests:**
   ```bash
   npm test                    # Ejecutar todos los tests
   npm test -- --watch        # Ejecutar tests en modo watch
   npm test -- --coverage     # Ejecutar tests con reporte de cobertura
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Ejecutar en modo producción:**
   ```bash
   npm start
   ```

El servidor estará disponible en: `http://localhost:3000`

## 📋 Endpoints Disponibles

### Información de la API
- `GET /` - Información general y endpoints disponibles

### Autenticación
- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión y obtener token JWT
- `GET /auth/profile` - Obtener perfil del usuario autenticado (requiere token)
- `GET /auth/verify` - Verificar si el token es válido

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario por ID
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario existente
- `DELETE /users/:id` - Eliminar un usuario (borrado lógico)

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

### Registrar un nuevo usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@example.com", "password": "password123"}'
```

### Iniciar sesión
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "juan@example.com", "password": "password123"}'
```

### Obtener perfil (requiere token)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing Unitario

Este proyecto incluye una suite completa de **testing unitario** implementada con **Jest**, demostrando las mejores prácticas de testing en aplicaciones Node.js con TypeScript.

### 📊 Cobertura de Tests

```
Test Suites: 4 passed, 2 skipped, 6 total
Tests:       22 passed, 2 skipped, 24 total
```

#### ✅ Tests Implementados:

1. **`user.controller.test.ts`** - **5 tests**
   - getUsers (casos exitoso y manejo de errores)
   - getUser (caso exitoso y usuario no encontrado)
   - createUser (caso exitoso)

2. **`auth.controller.test.ts`** - **12 tests**
   - register (exitoso, errores de validación, errores internos)
   - login (exitoso, credenciales inválidas, errores internos)
   - getProfile (exitoso, no autenticado, errores internos)
   - verifyToken (válido, inválido, errores internos)

3. **`response.helper.test.ts`** - **3 tests**
   - success (con datos individuales y arrays)
   - error (manejo de errores)

4. **`regex.helper.test.ts`** - **2 tests**
   - Validaciones de expresiones regulares

#### ⏸️ Tests Documentados:

5. **`auth.service.test.ts`** - **Skipped**
   - Documentado problema arquitectural (DatabaseManager singleton)
   - Requiere refactoring de inyección de dependencias

6. **`user.service.test.ts`** - **Skipped**
   - Documentado dependencias complejas
   - Requiere separación de concerns

### 🎯 Conceptos de Testing Demostrados

#### **1. Mocking Estratégico**
```typescript
// Mock de servicios
jest.mock('../services/user.service');
jest.mock('../helpers/response.helper');

const mockUserService = userService as jest.Mocked<typeof userService>;
const mockResponseHelper = ResponseHelper as jest.Mocked<typeof ResponseHelper>;
```

#### **2. Patrón AAA (Arrange-Act-Assert)**
```typescript
it('debería retornar todos los usuarios exitosamente', async () => {
  // Arrange: Preparar datos y mocks
  const mockUsers = [
    { id: 1, name: 'Juan', email: 'juan@test.com', /* ... */ }
  ];
  mockUserService.getAllUsers.mockResolvedValue(mockUsers);

  // Act: Ejecutar la función
  await userController.getUsers(mockRequest, mockResponse);

  // Assert: Verificar resultados
  expect(mockUserService.getAllUsers).toHaveBeenCalledTimes(1);
  expect(mockResponseHelper.success).toHaveBeenCalledWith(mockResponse, mockUsers);
});
```

#### **3. Testing de Casos Edge**
- ✅ **Casos exitosos** (happy path)
- ❌ **Manejo de errores** y excepciones
- 🔍 **Casos límite** (usuario no encontrado, datos inválidos)
- 🔐 **Estados de autenticación** (autenticado vs no autenticado)

#### **4. Manejo de Console Logs en Tests**
```typescript
it('debería manejar errores correctamente', async () => {
  // Suprimir console.error para tests más limpios
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  const error = new Error('Database error');
  mockUserService.getAllUsers.mockRejectedValue(error);

  await userController.getUsers(mockRequest, mockResponse);

  // Verificar que el error se loggea correctamente
  expect(consoleSpy).toHaveBeenCalledWith('Error en getUsers:', error);
  expect(mockResponseHelper.error).toHaveBeenCalledWith(mockResponse, 'Error interno del servidor');
  
  consoleSpy.mockRestore();
});
```

#### **5. Tipado TypeScript en Tests**
```typescript
// Extender tipos para testing
interface RequestWithUser extends Request {
  user?: User;
}

// Uso de tipos en tests
const mockRequest: Partial<RequestWithUser> = {};
const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
```

### 🚀 Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm test -- src/controllers/user.controller.test.ts

# Ejecutar tests con cobertura
npm test -- --coverage

# Modo watch para desarrollo
npm test -- --watch

# Tests con información detallada
npm test -- --verbose
```

### 📋 Configuración de Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
  ],
};
```

### 🎓 Para Estudiantes - Conceptos de Testing

Este proyecto demuestra:

1. **🧪 Unit Testing**: Testing de unidades aisladas de código
2. **🎭 Mocking**: Simulación de dependencias externas
3. **📊 Test Coverage**: Medición de cobertura de código
4. **🔍 Edge Cases**: Testing de casos límite y errores
5. **🏗️ Test Architecture**: Organización y estructura de tests
6. **🔄 CI/CD Ready**: Tests preparados para integración continua
7. **📝 Test Documentation**: Documentación de limitaciones arquitecturales
8. **🛡️ Error Handling**: Testing de manejo de errores y excepciones

### 💡 Beneficios del Testing Implementado

- ✅ **Prevención de bugs**: Detección temprana de errores
- ✅ **Refactoring seguro**: Cambios con confianza
- ✅ **Documentación viva**: Tests como especificación
- ✅ **Calidad de código**: Mejor diseño y arquitectura
- ✅ **Mantenibilidad**: Código más fácil de mantener
- ✅ **Colaboración**: Facilita trabajo en equipo

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
@Filter({ name: 'softDelete', cond: { deletedAt: null }, default: true })
@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ fieldName: 'deleted_at', nullable: true })
  deletedAt: Date | null = null;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
```

### Scripts Disponibles
```bash
npm run build       # Compilar TypeScript a JavaScript
npm run dev         # Ejecutar en modo desarrollo con ts-node
npm run dev:watch   # Ejecutar con nodemon y recarga automática
npm start           # Ejecutar versión compilada en producción
npm test            # Ejecutar suite de tests unitarios
npm test -- --watch          # Tests en modo watch
npm test -- --coverage       # Tests con reporte de cobertura
npm test -- --verbose        # Tests con información detallada
```

## 📚 Para Estudiantes

Este proyecto demuestra:

### 🏗️ Arquitectura y Desarrollo
1. ✅ Estructura básica de una API REST
2. ✅ Separación de responsabilidades por capas
3. ✅ Persistencia en base de datos con ORM
4. ✅ Manejo de errores y validaciones
5. ✅ Operaciones CRUD completas
6. ✅ Middleware personalizado
7. ✅ Configuración de base de datos
8. ✅ Buenas prácticas de organización de código

### 🔐 Autenticación y Seguridad
9. ✅ Sistema de autenticación JWT
10. ✅ Middleware de autenticación
11. ✅ Encriptación de contraseñas con bcrypt
12. ✅ Validación de tokens
13. ✅ Protección de rutas privadas

### 🧪 Testing y Calidad
14. ✅ Testing unitario con Jest
15. ✅ Mocking de dependencias
16. ✅ Patrón AAA (Arrange-Act-Assert)
17. ✅ Testing de casos edge y errores
18. ✅ Cobertura de código
19. ✅ Testing de controladores y helpers
20. ✅ Manejo de console logs en tests

### 🗄️ Base de Datos Avanzada
21. ✅ Borrado lógico (soft delete)
22. ✅ Filtros automáticos con MikroORM
23. ✅ Gestión de timestamps
24. ✅ Validaciones a nivel de base de datos

## 🔧 Tecnologías Utilizadas

### Core Framework
- **Node.js**: Runtime de JavaScript
- **TypeScript**: Superset tipado de JavaScript
- **Express**: Framework web minimalista con tipos

### Base de Datos y ORM
- **MySQL**: Sistema de gestión de bases de datos relacionales
- **MikroORM**: ORM moderno para TypeScript/Node.js
- **Reflect Metadata**: Para soporte de decoradores

### Autenticación y Seguridad
- **JWT (jsonwebtoken)**: Tokens de autenticación
- **bcryptjs**: Encriptación de contraseñas

### Validación
- **Joi**: Validación de esquemas y datos

### Testing
- **Jest**: Framework de testing unitario
- **@types/jest**: Tipos de TypeScript para Jest
- **ts-jest**: Preset de Jest para TypeScript

### Desarrollo
- **ts-node**: Ejecución directa de TypeScript en desarrollo
- **Nodemon**: Auto-recarga durante el desarrollo
- **@types/***: Tipos de TypeScript para librerías JavaScript

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**
2. **Instalar dependencias**: `npm install`
3. **Configurar MySQL**: Crear base de datos "api-express-demo"
4. **Verificar conexión**: `npx ts-node test-db.ts`
5. **Ejecutar tests**: `npm test` (verificar que todo funciona)
6. **Ejecutar en desarrollo**: `npm run dev`
7. **Compilar para producción**: `npm run build`
8. **Ejecutar producción**: `npm start`

### 🧪 Verificación con Tests

Antes de usar la API, ejecuta los tests para verificar que todo funciona:

```bash
# Verificar que los tests pasan
npm test

# Ver cobertura de código
npm test -- --coverage

# Output esperado:
# Test Suites: 4 passed, 2 skipped, 6 total  
# Tests:       22 passed, 2 skipped, 24 total
```

## 💡 Ventajas de TypeScript

- ✅ **Tipado estático**: Prevención de errores en tiempo de compilación
- ✅ **IntelliSense mejorado**: Mejor autocompletado en IDEs
- ✅ **Refactoring seguro**: Cambios con confianza
- ✅ **Decoradores nativos**: Uso pleno de MikroORM
- ✅ **Interfaces**: Contratos claros entre capas
- ✅ **Mejor documentación**: Código autodocumentado

## 🎯 Mejores Prácticas Implementadas

### 🏗️ Arquitectura
- **Separación de responsabilidades**: Controller → Service → Repository
- **Inyección de dependencias**: A través de imports/exports
- **Configuración centralizada**: Variables de entorno y configs
- **Estructura modular**: Organización clara por funcionalidad

### 🔒 Seguridad
- **Autenticación JWT**: Tokens seguros con expiración
- **Encriptación de contraseñas**: bcrypt con salt rounds
- **Validación de entrada**: Joi schemas en todas las rutas
- **Middleware de autenticación**: Protección de rutas privadas

### 🗄️ Base de Datos
- **ORM con tipos**: MikroORM con decoradores TypeScript
- **Soft Delete**: Preservación de datos históricos
- **Timestamps automáticos**: createdAt/updatedAt
- **Validaciones**: Constraints a nivel de entidad

### 🧪 Testing
- **Cobertura completa**: Controllers, helpers y utilities
- **Mocking estratégico**: Aislamiento de unidades
- **Casos edge**: Testing de errores y límites
- **Documentación de limitaciones**: Tests skipped explicados

### 📝 Código Limpio
- **Nomenclatura consistente**: camelCase para variables, PascalCase para clases
- **Funciones puras**: Separación de lógica de negocio
- **Manejo de errores**: Try-catch consistente
- **Logging estructurado**: Console logs informativos

### 🚀 DevOps Ready
- **Scripts npm**: Comandos para desarrollo y producción  
- **Configuración Jest**: Testing automatizado
- **TypeScript compilation**: Build process optimizado
- **Environment variables**: Configuración flexible

---

## 📖 Recursos para Aprender Más

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [MikroORM Documentation](https://mikro-orm.io/)
- [Jest Testing Framework](https://jestjs.io/)
- [JWT Introduction](https://jwt.io/introduction/)
- [Joi Validation](https://joi.dev/)

---

**🎓 Este proyecto es ideal para aprender desarrollo backend moderno con TypeScript, testing unitario y mejores prácticas de la industria.**