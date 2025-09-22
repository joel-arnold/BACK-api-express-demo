// Tests para auth.service requieren refactoring de arquitectura
// El DatabaseManager se instancia al importar el módulo, lo que dificulta el mocking

describe('AuthService', () => {
  it.skip('requiere refactoring para testing unitario', () => {
    // Los tests de auth.service están limitados por la arquitectura actual
    // donde DatabaseManager.getInstance() se ejecuta al importar el módulo
    // 
    // Para implementar estos tests se necesitaría:
    // 1. Inyección de dependencias en el servicio
    // 2. O refactoring para lazy loading del DatabaseManager
    // 3. O usar tests de integración en lugar de unitarios
  });
});