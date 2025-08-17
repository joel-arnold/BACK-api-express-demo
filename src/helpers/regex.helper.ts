/**
 * Helper para expresiones regulares reutilizables
 */
export class RegexHelper {
  /**
   * Expresión regular para validar formato de email básico
   * Validación: [texto]@[texto].[texto]
   */
  static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Valida si un email tiene un formato válido
   * @param email - El email a validar
   * @returns true si el email es válido, false en caso contrario
   */
  static isValidEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  /**
   * Valida si una cadena contiene solo letras y espacios (nombres)
   * @param name - El nombre a validar
   * @returns true si el nombre es válido, false en caso contrario
   */
  static isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    return nameRegex.test(name.trim());
  }

  /**
   * Valida si una contraseña cumple con criterios mínimos de seguridad
   * Al menos 6 caracteres
   * @param password - La contraseña a validar
   * @returns true si la contraseña es válida, false en caso contrario
   */
  static isValidPassword(password: string): boolean {
    // Mínimo 6 caracteres
    return password.length >= 6;
  }
}
