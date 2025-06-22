# Ejemplos de Pruebas para la API

## Usando curl (desde terminal)

### 1. Información de la API
```bash
curl http://localhost:3000/
```

### 2. Obtener todos los usuarios
```bash
curl http://localhost:3000/users
```

### 3. Obtener un usuario específico
```bash
curl http://localhost:3000/users/1
```

### 4. Crear un nuevo usuario
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ana García", "email": "ana@example.com"}'
```

### 5. Actualizar un usuario
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "email": "alice.smith@example.com"}'
```

### 6. Eliminar un usuario
```bash
curl -X DELETE http://localhost:3000/users/3
```

### 7. Pruebas de validación (errores esperados)

#### Sin nombre:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

#### Sin email:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User"}'
```

#### Email inválido:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "email-invalido"}'
```

#### Email duplicado:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob Clone", "email": "bob@example.com"}'
```

#### Usuario inexistente:
```bash
curl http://localhost:3000/users/999
```

## Usando PowerShell (Windows)

### Obtener usuarios
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET
```

### Crear usuario
```powershell
$body = @{
    name = "María González"
    email = "maria@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Body $body -ContentType "application/json"
```

## Respuestas Esperadas

### Éxito - Lista de usuarios:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob", 
      "email": "bob@example.com"
    }
  ],
  "total": 2
}
```

### Error - Usuario no encontrado:
```json
{
  "success": false,
  "error": "Usuario no encontrado"
}
```

### Error - Validación:
```json
{
  "success": false,
  "error": "El campo \"name\" es requerido"
}
```
