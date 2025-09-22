import { test, expect } from '@jest/globals';

test('debería validar una dirección de correo electrónico', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(regexEmail.test('test@example.com')).toBe(true);
    expect(regexEmail.test('invalid-email')).toBe(false);
});

test('debería validar un número de teléfono', () => {
    const regexPhone = /^\d{10}$/;
    expect(regexPhone.test('1234567890')).toBe(true);
    expect(regexPhone.test('123-456-7890')).toBe(false);
});