import { HttpException } from '@nestjs/common';
import { ErrorManager } from './error.manager';

describe('ErrorManager', () => {
  it('should throw an error with the right error code', async () => {
    await expect(async () => {
      try {
        throw new ErrorManager('BAD_REQUEST', 'error');
      } catch (error) {
        ErrorManager.createSignaturError((error as Error).message);
      }
    }).rejects.toThrow('BAD_REQUEST :: error');

    await expect(async () => {
      try {
        throw new ErrorManager('BAD_REQUEST', 'error');
      } catch (error) {
        ErrorManager.createSignaturError((error as Error).message);
      }
    }).rejects.toBeInstanceOf(HttpException);
  });
});
