import { Response } from 'express';
import { ResponseHelper } from './response.helper';

describe('ResponseHelper', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('success', () => {
    it('debería retornar respuesta exitosa con datos', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Operación exitosa';

      ResponseHelper.success(mockResponse as Response, data, message);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: message,
        data: data
      });
    });

    it('debería incluir total cuando data es un array', () => {
      const data = [{ id: 1, name: 'Test1' }, { id: 2, name: 'Test2' }];
      const message = 'Lista obtenida';

      ResponseHelper.success(mockResponse as Response, data, message);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: message,
        data: data,
        total: 2
      });
    });
  });

  describe('error', () => {
    it('debería retornar respuesta de error', () => {
      const message = 'Error interno';

      ResponseHelper.error(mockResponse as Response, message);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: message
      });
    });
  });
});