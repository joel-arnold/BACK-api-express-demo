// Tests para user.service requieren refactoring de dependencias
// La dependencia con auth.service y DatabaseManager complica el testing unitario

describe('UserService', () => {
  it.skip('requiere refactoring para testing unitario', () => {
    // Los tests de user.service están limitados por:
    // 1. Dependencia directa con auth.service que instancia DatabaseManager
    // 2. DatabaseManager se instancia al importar el módulo
    // 
    // Para implementar estos tests se necesitaría:
    // 1. Inyección de dependencias 
    // 2. Separar las funciones de utilidad (hashPassword) del servicio de auth
    // 3. O usar tests de integración que levanten una base de datos real
  });
});