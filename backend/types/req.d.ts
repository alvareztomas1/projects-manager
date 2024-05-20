import { Request } from 'express';

declare module 'Express' {
  export interface Request {
    userId: string;
    userRole: string;
  }
}
