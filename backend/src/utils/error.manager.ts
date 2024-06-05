import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor(type: keyof typeof HttpStatus, message: string) {
    super(`${type} :: ${message}`);
  }

  static createSignaturError(message: string) {
    const errorName: any = message.split(' :: ')[0];
    const errorCode = Number(HttpStatus[errorName]);

    throw new HttpException(message, errorCode);
  }
}
